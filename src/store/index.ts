import { createStore } from "vuex";
import dashboard from "./modules/dashboard";
import app from "./modules/app";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    dashboard,
  },
});
