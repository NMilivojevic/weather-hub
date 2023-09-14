import { ChangeEvent, FC, useEffect, useState } from "react";
import tempIcon from "../assets/temp.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import cloudIcon from "../assets/cloud.png";
import pressureIcon from "../assets/pressure.png";
import visibilityIcon from "../assets/visibility.png";
import precipitationIcon from "../assets/precipitation.png";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
    searchCity,
    selectCurrentWeatherData,
    setApiData,
} from "../features/currentWeather/currentWeatherSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentWeather } from "../types";
import { format, parseISO } from "date-fns";

interface DataFetcherProps {
    searchUrlQuery: string;
    dispatch: (action: PayloadAction<ICurrentWeather>) => void;
}

interface FormattedDateTime {
    formattedDate: string;
    formattedTime: string;
}

const userFriendlyTime = (dateTimeString: string): FormattedDateTime | null => {
    try {
        const date = parseISO(dateTimeString);

        if (!date || isNaN(date.getTime())) {
            throw new Error("Invalid date-time string");
        }

        const formattedDate = format(date, "MMMM dd, yyyy");
        const formattedTime = format(date, "HH:mm");
        return { formattedDate, formattedTime };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return null;
    }
};

const getGreeting = (formattedTime: string): string => {
    const hour = parseInt(formattedTime.split(":")[0], 10);

    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
};

const DataFetcher: FC<DataFetcherProps> = ({ searchUrlQuery, dispatch }) => {
    useEffect(() => {
        const fetchData = async () => {
            const url = searchUrlQuery;
            const options: RequestInit = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
                    "X-RapidAPI-Host": import.meta.env.VITE_X_RapidAPI_Host,
                },
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                dispatch(setApiData(JSON.parse(result)));
            } catch (error) {
                console.error(error);
            }
        };

        // fetchData();
    }, [searchUrlQuery, dispatch]);

    return null;
};

const SearchForm: FC = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const handleSearch = () => {
        dispatch(searchCity(searchValue));
        setSearchValue("");
    };

    return (
        <div className="w-full flex justify-center items-center gap-5">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Lookup weather for a specific city..."
                className="p-2 rounded-md w-2/6 focus:outline-none focus-visible:ring text-slate-900"
                value={searchValue}
                onChange={handleChange}
            />
            <button
                type="button"
                role="button"
                className="bg-slate-900 px-6 py-2 rounded-md hover:bg-slate-700"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

const WeatherInfo: FC = () => {
    const currentWeather = useAppSelector(selectCurrentWeatherData);

    const formattedDateTime = userFriendlyTime(
        currentWeather?.location?.localtime
    );

    let greeting: string = "";

    const feelsLike = currentWeather?.current?.feelslike_c;
    const condtionText = currentWeather?.current?.condition?.text;
    const conditionIcon = currentWeather?.current?.condition?.icon;

    if (formattedDateTime) {
        greeting = getGreeting(formattedDateTime?.formattedTime);
    }

    const renderWeatherValue = (icon: string, value: string) => (
        <div className="flex justify-start items-center gap-2">
            <img src={icon} className="w-10" alt="Icon" />
            <p className="text-2xl text-white">{value}</p>
        </div>
    );

    if (currentWeather.location.name === "") {
        // Display a loading state here
        return <p className="text-white text-2xl">Loading...</p>;
    }

    return (
        <section className="rounded-xl p-8 w-3/5 text-white shadow-xl shadow-gray-950 bg-sky-900">
            <h1 className="text-4xl text-center pb-4">
                {currentWeather?.location?.name},{" "}
                {currentWeather?.location?.country}
            </h1>
            <div className="w-full flex justify-start items-center gap-4 border-b-2 pb-3 border-sky-700">
                <div className="p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer">
                    Current weather
                </div>
                {/* <div className="p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer">Forecast</div> */}
            </div>
            <div className="py-8 flex justify-between items-center">
                <div className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-11 flex-auto">
                    {renderWeatherValue(
                        tempIcon,
                        currentWeather?.current?.temp_c.toString() + " °C"
                    )}
                    {renderWeatherValue(
                        windIcon,
                        currentWeather?.current?.wind_kph.toString() + " kph"
                    )}
                    {renderWeatherValue(
                        cloudIcon,
                        currentWeather?.current?.cloud.toString()
                    )}
                    {renderWeatherValue(
                        humidityIcon,
                        currentWeather?.current?.humidity.toString() + " %"
                    )}
                    {renderWeatherValue(
                        pressureIcon,
                        currentWeather?.current?.pressure_mb.toString() + " mb"
                    )}
                    {renderWeatherValue(
                        visibilityIcon,
                        currentWeather?.current?.vis_km.toString() + " km"
                    )}
                    {renderWeatherValue(
                        precipitationIcon,
                        currentWeather?.current?.precip_mm.toString() + " mm"
                    )}
                </div>
                <div className="border-l-2 border-sky-700 pl-4 flex flex-col items-center justify-start text-white gap-10 text-center flex-1">
                    <div className="flex flex-col justify-center items-center text-center gap-3">
                        <p className="text-xl">{greeting}</p>
                        <div>
                            <p>{formattedDateTime?.formattedDate}</p>
                            <p>{formattedDateTime?.formattedTime}</p>
                        </div>
                    </div>
                    <p className="text-md">Feels like: {feelsLike} °C</p>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-3xl">{condtionText}</p>
                        <div>
                            <img src={conditionIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Public: FC = () => {
    const dispatch = useAppDispatch();
    const currentWeather = useAppSelector(selectCurrentWeatherData);
    const searchCity = currentWeather?.location?.name || "Niš";
    const searchUrlQuery = import.meta.env.VITE_X_RAPIDAPI_Url + searchCity;

    return (
        <>
            <DataFetcher searchUrlQuery={searchUrlQuery} dispatch={dispatch} />
            <div className="h-screen w-full dark:bg-gray-900">
                <header>
                    <nav className="dark:bg-gray-800 flex justify-center items-center text-white py-5">
                        <SearchForm />
                    </nav>
                </header>
                <main className="flex justify-center items-center mt-10">
                    <WeatherInfo />
                </main>
            </div>
        </>
    );
};

export default Public;
