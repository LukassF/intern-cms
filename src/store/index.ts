import { createStore, useStore as baseUseStore } from "vuex";
import app from "./modules/app";
import dashboard from "./modules/dashboard";
import { IRootState } from "@/utils/types";
import users from "./modules/users";

export default createStore<IRootState>({
  modules: {
    app,
    dashboard,
    users,
  },
});

export function useTypedStore() {
  return baseUseStore<IRootState>();
}
