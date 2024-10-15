import { IDahboardState } from "@/utils/types";

export default {
  namespaced: true,
  state: (): IDahboardState => ({
    activePage: 1,
    userSearch: "",
    tableLoading: true,
  }),

  mutations: {
    SET_ACTIVE_PAGE(state: IDahboardState, page: number) {
      state.activePage = page;
    },
    SET_USER_SEARCH(state: IDahboardState, val: string) {
      state.userSearch = val;
    },
    SET_TABLE_LOADING(state: IDahboardState, val: boolean) {
      state.tableLoading = val;
    },
  },
};
