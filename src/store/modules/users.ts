import { BACKEND_URL, USERS_PER_PAGE } from "@/utils/constants";
import {
  IAppState,
  IOverlayData,
  IResponseUser,
  IRootState,
  IUser,
  IUsersState,
} from "@/utils/types";
import {
  createRequestFromUser,
  createUserFromResponse,
  getNumberOfPages,
  matchesSearch,
} from "@/utils/utils";
import axios from "axios";
import { Component } from "vue";
import { Router } from "vue-router";
import { ActionContext } from "vuex";

export default {
  namespaced: true,
  state: (): IUsersState => ({
    users: {},
    totalUsersCount: 0,
  }),
  getters: {
    getFilteredUsers(state: IUsersState, _: any, rootState: IRootState) {
      return Object.values(state.users).filter((user) =>
        matchesSearch(user, rootState.dashboard.userSearch)
      );
    },
  },
  mutations: {
    SET_USERS(state: IUsersState, users: IUser[]) {
      if (users) {
        users.forEach((user) => {
          state.users[user.id] = user;
        });
        state.totalUsersCount = users.length;
      }
    },
    ADD_OR_MODIFY_USER(state: IUsersState, user: IUser) {
      if (!Object.keys(state.users).includes(user.id.toString())) {
        state.totalUsersCount++;
      }
      state.users[user.id] = user;
    },
    REMOVE_USER(state: IUsersState, userId: number) {
      if (state.users[userId]) {
        delete state.users[userId];
        state.totalUsersCount--;
      }
    },
  },
  actions: {
    // we have to get all users because of maintainability isues, visit README.md for more info
    async getAllUsers(
      { commit }: ActionContext<IUsersState, IRootState>,
      delay?: number
    ) {
      try {
        commit("dashboard/SET_TABLE_LOADING", true, { root: true });

        const response = await axios.get(BACKEND_URL);

        if (!response?.data?.data) {
          throw new Error("Invalid response total");
        }
        const total = response.data.total;

        const allUsersResponse = await axios.get(
          `${BACKEND_URL}?per_page=${total}&page=1&delay${delay}`
        );

        if (!allUsersResponse?.data?.data) {
          throw new Error("Invalid response users");
        }
        const users: IResponseUser[] = allUsersResponse.data.data;
        const payloadUsers: IUser[] = users.map(createUserFromResponse);

        commit("SET_USERS", payloadUsers);
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
      { commit }: ActionContext<IUsersState, IRootState>,
      userId: number
    ) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/${userId}`);
        if (response.status !== 204) {
          throw new Error("Request failed");
        }
        commit("REMOVE_USER", userId);
      } catch (error) {
        console.log("Failed to delete user", error);
      }
    },
  },
};
