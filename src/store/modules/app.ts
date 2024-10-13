interface IAppState {
  showOverlay: boolean;
}

export default {
  namespaced: true, // Namespaced to isolate this module
  state: (): IAppState => ({
    showOverlay: false,
  }),
  mutations: {
    setShowOverlay(state: IAppState, show: boolean) {
      state.showOverlay = show;
    },
  },
  actions: {},
};
