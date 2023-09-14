import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
interface ICurrentWeather {
    cityName: string;
}

// Define the initial state using that type
const initialState: ICurrentWeather = {
    cityName: "",
};

export const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

// export const {} = currentWeatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentWeatherData = (state: RootState) =>
    state.currentWeather;

export default currentWeatherSlice.reducer;
