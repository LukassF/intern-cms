import {
  BACKEND_URL,
  PLACEHOLDER_USER,
  USERS_PER_PAGE,
} from "@/utils/constants";
import { IResponseUser, IRootState, IUser, IUsersState } from "@/utils/types";
import {
  allUsersLoaded,
  createRequestFromUser,
  createUserFromResponse,
  matchesSearch,
} from "@/utils/utils";
import axios from "axios";
import { ActionContext } from "vuex";

export default {
  namespaced: true,
  state: (): IUsersState => ({
    users: {},
    totalCountApi: 0,
    totalCountCreated: 0,
    totalCountDeleted: 0,
    array: [],
  }),
  getters: {
    getFilteredUsers(state: IUsersState, _: any, rootState: IRootState) {
      return Object.values(state.users).filter((user) =>
        matchesSearch(user, rootState.dashboard.userSearch)
      );
    },
    getFilteredArray(state: IUsersState, _: any, rootState: IRootState) {
      return [...state.array].filter((user) =>
        matchesSearch(user ?? PLACEHOLDER_USER, rootState.dashboard.userSearch)
      );
    },
    getTotalUsers(state: IUsersState) {
      return allUsersLoaded(state.array)
        ? state.array.length
        : state.totalCountApi +
            state.totalCountCreated -
            state.totalCountDeleted;
    },
  },
  mutations: {
    SET_TOTAL_COUNT_API(state: IUsersState, val: number) {
      state.totalCountApi = val;
      state.array = Array(val).fill(undefined);
    },
    INCREMENT_TOTAL_COUNT_CREATED(state: IUsersState) {
      state.totalCountCreated++;
    },
    SET_USERS_ARRAY(state: IUsersState, array: Array<IUser | undefined>) {
      state.array = array;
    },
    SET_USERS(
      state: IUsersState,
      {
        users,
        page,
        perPage = USERS_PER_PAGE,
      }: { users: IUser[]; page: number; perPage: number }
    ) {
      if (users) {
        users.forEach((user, idx) => {
          state.users[user.id] = user;
          state.array[(page - 1) * perPage + idx] = user;
        });
      }
    },
    ADD_OR_MODIFY_USER(state: IUsersState, user: IUser) {
      state.users[user.id] = user;
      const findIdx = state.array.findIndex((item) => item?.id === user.id);
      if (findIdx === -1) {
        state.array.push(user);
        state.totalCountCreated++;
      } else {
        state.array[findIdx] = user;
      }
    },
    REMOVE_USER(state: IUsersState, userId: number) {
      if (state.users[userId]) {
        delete state.users[userId];
        const findIdx = state.array.findIndex((item) => item?.id === userId);

        if (findIdx !== -1) {
          state.array.splice(findIdx, 1);
        }
        state.totalCountDeleted++;
      }
    },
  },
  actions: {
    async getUsers(
      { state, commit }: ActionContext<IUsersState, IRootState>,
      { pageIdx }: { pageIdx: number }
    ) {
      try {
        commit("dashboard/SET_TABLE_LOADING", true, { root: true });

        const usersResponse = await axios.get(
          `${BACKEND_URL}?per_page=${USERS_PER_PAGE}&page=${pageIdx}&delay=5`
        );

        if (!usersResponse?.data?.data) {
          throw new Error("Invalid response users");
        }
        const users: IResponseUser[] = usersResponse.data.data;
        const payloadUsers: IUser[] = users.map(createUserFromResponse);

        if (!state.totalCountApi) {
          commit("SET_TOTAL_COUNT_API", usersResponse.data.total);
        }
        commit("SET_USERS", { users: payloadUsers, page: pageIdx });
      } catch (error) {
        console.log("Failed to get users", error);
      } finally {
        commit("dashboard/SET_TABLE_LOADING", false, { root: true });
      }
    },
    // we have to use getAllUsers in some cases because of maintainability isues
    // visit README.md for more info
    async getAllUsers({
      state,
      commit,
    }: ActionContext<IUsersState, IRootState>) {
      try {
        commit("dashboard/SET_TABLE_LOADING", true, { root: true });

        const allUsersResponse = await axios.get(
          `${BACKEND_URL}?per_page=${state.totalCountApi}&page=${1}`
        );

        if (!allUsersResponse?.data?.data) {
          throw new Error("Invalid response users");
        }
        const users: IResponseUser[] = allUsersResponse.data.data;
        const payloadUsers: IUser[] = users.map(createUserFromResponse);

        commit("SET_USERS", {
          users: payloadUsers,
          page: 1,
          perPage: state.totalCountApi,
        });
      } catch (error) {
        console.log("Failed to get users", error);
      } finally {
        commit("dashboard/SET_TABLE_LOADING", false, { root: true });
      }
    },
    async modifyUser(
      { commit }: ActionContext<IUsersState, IRootState>,
      user: IUser
    ) {
      try {
        const response = await axios.put(`${BACKEND_URL}/${user.id}`, {
          user: createRequestFromUser(user),
        });

        if (response.status !== 200 || !response.data) {
          throw new Error("Request failed");
        }

        commit("ADD_OR_MODIFY_USER", user);
      } catch (error) {
        console.log("Failed to modify user", error);
        throw error;
      }
    },

    async createUser(
      { commit }: ActionContext<IUsersState, IRootState>,
      user: Omit<IUser, "email" | "id">
    ) {
      try {
        const response = await axios.post(`${BACKEND_URL}`, {
          user: {
            email: "",
            first_name: user.firstName,
            last_name: user.lastName,
            avatar: user.avatar ?? "",
          },
        });

        if (response.status !== 201 || !response.data) {
          throw new Error("Request failed");
        }

        const userObject: IUser = {
          id: +response.data.id,
          email: "",
          ...user,
        };

        commit("ADD_OR_MODIFY_USER", userObject);
      } catch (error) {
        console.log("Failed to modify user", error);
        throw error;
      }
    },

    async deleteUser(
      { state, commit, dispatch }: ActionContext<IUsersState, IRootState>,
      { userId }: { userId: number }
    ) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/${userId}`);
        if (response.status !== 204) {
          throw new Error("Request failed");
        }
        // some data is not loaded so we fetch all to avoid pitfalls
        if (!allUsersLoaded(state.array)) {
          await dispatch("getAllUsers");
        }
        commit("REMOVE_USER", userId);
      } catch (error) {
        console.log("Failed to delete user", error);
      }
    },
  },
};
