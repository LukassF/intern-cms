import { ref, onMounted, onBeforeUnmount } from "vue";
import { IRequestUser, IResponseUser, IUser } from "./types";
import { USERS_PER_PAGE } from "./constants";

export function useMediaQuery(query: string) {
  const matches = ref(false);

  const mediaQueryList = window.matchMedia(query);

  matches.value = mediaQueryList.matches;

  const handleChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  onMounted(() => {
    mediaQueryList.addEventListener("change", handleChange);
  });

  onBeforeUnmount(() => {
    mediaQueryList.removeEventListener("change", handleChange);
  });

  return { matches };
}

export const getUsersForPage = (
  users: Array<IUser | undefined>,
  page: number
) => {
  return [...users].filter(
    (user, idx) =>
      idx >= (page - 1) * USERS_PER_PAGE && idx < page * USERS_PER_PAGE
  );
};

export function matchesSearch(user: IUser, val: string) {
  return (
    user.firstName.toLowerCase().includes(val.toLowerCase()) ||
    user.lastName.toLowerCase().includes(val.toLowerCase())
  );
}

export const getNumberOfPages = (usersLength: number) => {
  return Math.ceil(usersLength / USERS_PER_PAGE);
};

export const createUserFromResponse = (user: IResponseUser): IUser => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    avatar: user.avatar,
    email: user.email,
  };
};

export const createRequestFromUser = (user: IUser): IRequestUser => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    avatar: user.avatar,
  };
};

export const allUsersLoaded = (usersArr: Array<IUser | undefined>) => {
  return !usersArr.some((user) => !user);
};
