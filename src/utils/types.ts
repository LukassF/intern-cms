import { Component } from "vue";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface IResponseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface IRequestUser extends IResponseUser {}

export interface IOverlayData {
  child: Component;
  childProps: Object;
}

export interface IRootState {
  app: IAppState;
  dashboard: IDahboardState;
  users: IUsersState;
}

export interface IAppState {
  showOverlay: boolean;
  mountOverlay: boolean;
  overlayData: IOverlayData;
}

export interface IDahboardState {
  activePage: number;
  userSearch: string;
  tableLoading: boolean;
}

export interface IUsersState {
  totalCountDeleted: number;
  totalCountApi: number;
  totalCountCreated: number;
  users: Record<number, IUser>;
  array: Array<IUser | undefined>;
}
