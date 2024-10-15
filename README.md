# Intern cms task

---

## Overview

The project conforms to the guidelines given in the task overview. The implemented functionalities include:

- Fetching users from api (with pagination and lazy loading)
- Deleting users locally (with mock requests to the api beforehand)
- Adding and modifying users locally (with mock requests to the api beforehand)
- Searching user list locally

---

## Issues

The half-working mock api at `https://reqres.in/`, has proved to be problematic when handling deleting, adding and searching for users especially combined with the `paginated lazy loading` (data for each page is fetched only when the page is active for the first time). That is due to the fact that modifying data on the server is impossible and the api lacks server-side search (which would become useful when searching for users not yet loaded). Therefore some workarounds had to be conjured up i.e. loading remaining users before deleting or searching users.

---

## Versions

The project is created with `Vue 3` (as requested), along with:

- Typescript
- Tailwind CSS
- Loadash
- axios
