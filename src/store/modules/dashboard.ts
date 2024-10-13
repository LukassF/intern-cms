interface IDahboardState {
  numberOfPages: number;
  activePage: number;
}

export default {
  namespaced: true, // Namespaced to isolate this module
  state: (): IDahboardState => ({
    numberOfPages: 5,
    activePage: 1,
  }),
  mutations: {
    setNumberOfPages(state: IDahboardState, pages: number) {
      state.numberOfPages = pages;
    },
    setActivePage(state: IDahboardState, page: number) {
      state.activePage = page;
    },
  },
  actions: {},
};
