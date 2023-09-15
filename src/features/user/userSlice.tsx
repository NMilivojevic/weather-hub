import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { UserBasic } from "../../types";

interface UserState {
    user: null | UserBasic;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<UserBasic>) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
        saveCity: (state, action: PayloadAction<string[]>) => {
            if (state.user) {
                state.user.savedCities = action.payload;
            }
        },
    },
});

export const { loginUser, logoutUser, saveCity } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
