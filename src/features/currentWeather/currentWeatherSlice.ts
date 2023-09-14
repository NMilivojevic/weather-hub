import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { ICurrentWeather } from "../../types";

const initialState: ICurrentWeather = {
    location: {
        name: "",
        region: "",
        country: "",
        lat: 0,
        lon: 0,
        tz_id: "",
        localtime_epoch: 0,
        localtime: "",
    },
    current: {
        last_updated_epoch: 0,
        last_updated: "",
        temp_c: 0,
        temp_f: 0,
        is_day: 0,
        condition: {
            text: "",
            icon: "",
            code: 0,
        },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 0,
        wind_dir: "",
        pressure_mb: 0,
        pressure_in: 0,
        precip_mm: 0,
        precip_in: 0,
        humidity: 0,
        cloud: 0,
        feelslike_c: 0,
        feelslike_f: 0,
        vis_km: 0,
        vis_miles: 0,
        uv: 0,
        gust_mph: 0,
        gust_kph: 0,
    },
};

export const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState,
    reducers: {
        // TBD find out why this one doesnt work
        // setApiData: (state, action: PayloadAction<ICurrentWeather>) => {
        //     // This is valid in Redux Toolkit; it directly updates the state.
        //     state = action.payload;
        // },
        setApiData: (state, action: PayloadAction<ICurrentWeather>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        searchCity: (state, action: PayloadAction<string>) => {
            state.location.name = action.payload;
        },
    },
});

export const { searchCity, setApiData } = currentWeatherSlice.actions;

export const selectCurrentWeatherData = (state: RootState) =>
    state.currentWeather;

export default currentWeatherSlice.reducer;
