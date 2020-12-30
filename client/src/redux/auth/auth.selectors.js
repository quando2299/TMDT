import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectIsAuthenticate = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticate
);

export const selectLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);
