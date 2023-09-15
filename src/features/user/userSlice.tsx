import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { User } from "firebase/auth";

const initialState = {
    user: {},
    loginStatus: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.loginStatus = action.payload;
        },
        setUser: (state, action) => {
            console.log(action.payload);
            state.user = action.payload;
        },
    },
});

export const { setLoginStatus, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
