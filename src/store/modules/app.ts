import { IAppState, IOverlayData } from "@/utils/types";

export default {
  namespaced: true,
  state: (): IAppState => ({
    showOverlay: false,
    mountOverlay: false,
    overlayData: { child: {}, childProps: {} },
  }),

  mutations: {
    SET_SHOW_OVERLAY(state: IAppState, show: boolean) {
      if (show) {
        state.mountOverlay = show;
      }
      state.showOverlay = show;
    },
    SET_UNMOUNT_OVERLAY(state: IAppState) {
      state.mountOverlay = false;
    },
    SET_OVERLAY_DATA(state: IAppState, data: IOverlayData) {
      state.overlayData = data;
    },
  },
};
