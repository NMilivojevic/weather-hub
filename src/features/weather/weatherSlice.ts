import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { Weather } from "../../types";

const initialState: Weather = {
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
    forecast: {
        forecastday: [
            {
                date: "",
                date_epoch: 0,
                day: {
                    maxtemp_c: 0,
                    maxtemp_f: 0,
                    mintemp_c: 0,
                    mintemp_f: 0,
                    avgtemp_c: 0,
                    avgtemp_f: 0,
                    maxwind_mph: 0,
                    maxwind_kph: 0,
                    totalprecip_mm: 0,
                    totalprecip_in: 0,
                    totalsnow_cm: 0,
                    avgvis_km: 0,
                    avgvis_miles: 0,
                    avghumidity: 0,
                    daily_will_it_rain: 0,
                    daily_chance_of_rain: 0,
                    daily_will_it_snow: 0,
                    daily_chance_of_snow: 0,
                    condition: { text: "", icon: "", code: 0 },
                    uv: 0,
                },
                astro: {
                    sunrise: "",
                    sunset: "",
                    moonrise: "",
                    moonset: "",
                    moon_phase: "",
                    moon_illumination: "",
                    is_moon_up: 0,
                    is_sun_up: 0,
                },
                hour: [
                    {
                        time_epoch: 0,
                        time: "",
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
                        windchill_c: 0,
                        windchill_f: 0,
                        heatindex_c: 0,
                        heatindex_f: 0,
                        dewpoint_c: 0,
                        dewpoint_f: 0,
                        will_it_rain: 0,
                        chance_of_rain: 0,
                        will_it_snow: 0,
                        chance_of_snow: 0,
                        vis_km: 0,
                        vis_miles: 0,
                        gust_mph: 0,
                        gust_kph: 0,
                        uv: 0,
                    },
                ],
            },
        ],
    },
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        // TBD find out why this one doesnt work
        // setForecastApiData: (state, action: PayloadAction<Weather>) => {
        //     // This is valid in Redux Toolkit; it directly updates the state.
        //     state = action.payload;
        // },
        setForecastApiData: (state, action: PayloadAction<Weather>) => {
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

export const { searchCity, setForecastApiData } = weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
