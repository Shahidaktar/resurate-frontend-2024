import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { userAPI } from "./api/userAPI";
import { resumeAPI } from "./api/resumeAPI";
import { jobAPI } from "./api/jobAPI";
import { resumeReducer } from "./reducer/resumeReducer";
import { applyAPI } from "./api/ApplyAPI";
import { rankAPI } from "./api/RankAPI";

export const server = import.meta.env.VITE_SERVER;
export const server_ml = import.meta.env.VITE_ML_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [resumeAPI.reducerPath]: resumeAPI.reducer,
    [jobAPI.reducerPath]: jobAPI.reducer,
    [applyAPI.reducerPath]: applyAPI.reducer,
    [rankAPI.reducerPath]: rankAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [resumeReducer.name]: resumeReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      resumeAPI.middleware,
      jobAPI.middleware,
      applyAPI.middleware,
      rankAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;