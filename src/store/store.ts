import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "../features/currentWeather/currentWeatherSlice";

export const store = configureStore({
    reducer: {
        currentWeather: currentWeatherReducer,
        // comments: commentsReducer,
        // users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
