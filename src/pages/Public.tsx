import {
    ChangeEvent,
    FC,
    FormEvent,
    MouseEvent,
    useEffect,
    useState,
} from "react";
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
    selectWeatherData,
    setForecastApiData,
} from "../features/weather/weatherSlice";
import {
    FormattedDateTime,
    ForecastDataFetcherProps,
    UserBasic,
} from "../types";
import { format, isValid, parseISO } from "date-fns";
import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
    selectUser,
    setLoginStatus,
    setUser,
} from "../features/user/userSlice";
import { subscribeToAuthState } from "../firebase/authService";

const userFriendlyTime = (dateTimeString: string): FormattedDateTime | null => {
    try {
        const processedDateTimeString = dateTimeString.replace(
            /^(\d{4}-\d{2}-\d{2} )(\d:\d{2})$/,
            "$10$2"
        );
        const date = parseISO(processedDateTimeString);

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

function getDayOfWeek(dateString: string): string | null {
    if (!dateString || dateString.trim() === "") {
        return null; // Return null for empty or whitespace-only strings
    }

    const date = parseISO(dateString);

    if (!isValid(date)) {
        return null; // Return null for invalid date strings
    }

    const dayOfWeek = format(date, "EEEE"); // 'EEEE' represents the full day of the week (e.g., 'Monday')
    return dayOfWeek;
}
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

const ForecastDataFetcher: FC<ForecastDataFetcherProps> = ({
    searchUrlQuery,
    dispatch,
}) => {
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
                dispatch(setForecastApiData(JSON.parse(result)));
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
        <div className="flex justify-center items-center gap-5">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Lookup weather for a specific city..."
                className="p-2 rounded-md focus:outline-none focus-visible:ring text-slate-900"
                style={{ width: "300px" }}
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
    const weather = useAppSelector(selectWeatherData);
    const [showForecast, setShowForecast] = useState<boolean>(false);

    const formattedDateTime = userFriendlyTime(weather?.location?.localtime);

    const greeting: string = formattedDateTime
        ? getGreeting(formattedDateTime.formattedTime)
        : "";

    const renderWeatherValue = (icon: string, value: string) => (
        <div className="flex justify-start items-center gap-2">
            <img src={icon} className="w-10" alt="Icon" />
            <p className="text-2xl text-white">{value}</p>
        </div>
    );

    const tabHandler = (tab: string) => {
        setShowForecast(tab === "forecast");
    };

    if (weather.location.name === "") {
        return <p className="text-white text-2xl">Loading...</p>;
    }

    return (
        <section className="rounded-xl p-8 w-3/5 text-white shadow-xl shadow-gray-950 bg-sky-900">
            <h1 className="text-4xl text-center pb-4">
                {weather?.location?.name}, {weather?.location?.country}
            </h1>
            <div className="w-full flex justify-start items-center gap-4 border-b-2 pb-3 border-sky-700">
                <div
                    className={`p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer ${
                        !showForecast ? "bg-blue-700" : ""
                    }`}
                    onClick={() => tabHandler("current")}
                >
                    Current weather
                </div>
                <div
                    className={`p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer ${
                        showForecast ? "bg-blue-700" : ""
                    }`}
                    onClick={() => tabHandler("forecast")}
                >
                    Forecast
                </div>
            </div>
            <div className="py-8 flex justify-between items-center">
                {!showForecast ? (
                    <>
                        <div className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-11 flex-auto">
                            {renderWeatherValue(
                                tempIcon,
                                `${weather?.current?.temp_c} °C`
                            )}
                            {renderWeatherValue(
                                windIcon,
                                `${weather?.current?.wind_kph} kph`
                            )}
                            {renderWeatherValue(
                                cloudIcon,
                                `${weather?.current?.cloud}`
                            )}
                            {renderWeatherValue(
                                humidityIcon,
                                `${weather?.current?.humidity} %`
                            )}
                            {renderWeatherValue(
                                pressureIcon,
                                `${weather?.current?.pressure_mb} mb`
                            )}
                            {renderWeatherValue(
                                visibilityIcon,
                                `${weather?.current?.vis_km} km`
                            )}
                            {renderWeatherValue(
                                precipitationIcon,
                                `${weather?.current?.precip_mm} mm`
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
                            <p className="text-md">
                                Feels like: {weather?.current?.feelslike_c} °C
                            </p>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-3xl">
                                    {weather?.current?.condition?.text}
                                </p>
                                <div>
                                    <img
                                        src={weather?.current?.condition?.icon}
                                        alt="Weather Icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between items-center w-full">
                        {weather?.forecast?.forecastday
                            .slice(0, 3)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center items-center gap-1"
                                >
                                    <p className="font-bold">
                                        {getDayOfWeek(item.date)}
                                    </p>
                                    <img
                                        src={item.day.condition.icon}
                                        alt="Weather Icon"
                                    />
                                    <div className="flex justify-center items-center gap-1">
                                        <p className="text-md">{`${item.day.maxtemp_c} °C`}</p>
                                        <p>/</p>
                                        <p className="text-sm text-slate-300">{`${item.day.mintemp_c} °C`}</p>
                                    </div>
                                    <p>{item.day.condition.text}</p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const Public: FC = () => {
    const dispatchWeather = useAppDispatch();
    const weather = useAppSelector(selectWeatherData);

    const searchCity = weather?.location?.name || "Niš";
    const searchUrlQuery =
        import.meta.env.VITE_X_RAPIDAPI_Forecast_Url + searchCity + "&days=3";

    const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const dispatchUser = useAppDispatch();
    const user = useAppSelector(selectUser);

    console.log(user);

    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = subscribeToAuthState(
            (authUser) => {
                // setIsLoading(false);
                dispatchUser(setUser(authUser));
                dispatchUser(setLoginStatus(!!authUser));
            },
            (error) => {
                console.error("Authentication error:", error);
            }
        );

        // Cleanup the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [dispatchUser]);

    const handleAuthModal = () => {
        setOpenAuthModal((prev) => !prev);
    };

    const loginHandler = () => {
        setShowLogin((prev) => !prev);
    };

    const backdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setOpenAuthModal(false);
        }
    };

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const displayName: string = (e.currentTarget[0] as HTMLInputElement)
            ?.value;
        const email: string = (e.currentTarget[1] as HTMLInputElement)?.value;
        const password: string = (e.currentTarget[2] as HTMLInputElement)
            ?.value;

        try {
            const response: UserCredential =
                await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName });

            const DocumentObj: UserBasic = {
                uid: response.user.uid,
                displayName,
                email,
            };
            await setDoc(doc(db, "Users", response.user.uid), DocumentObj);
            setOpenAuthModal(false);
        } catch (error) {
            const err = error as FirebaseError;
            console.log(err.code);
            console.log(err.message);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already in use.");
            }
            if (err.code === "auth/weak-password") {
                setError("Provide a password with minimum 6 characters.");
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email: string = (e.currentTarget[0] as HTMLInputElement)?.value;
        const password: string = (e.currentTarget[1] as HTMLInputElement)
            ?.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setOpenAuthModal(false);
        } catch (error) {
            const err = error as FirebaseError;
            console.log(err.code);
            console.log(err.message);
            if (err.code === "auth/invalid-login-credentials") {
                setError("Invalid login credentials.");
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const handleLogout = async (): Promise<void> => {
        try {
            await signOut(auth);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            {openAuthModal ? (
                <div
                    className="absolute h-full w-full top-0 left-0"
                    style={{ background: "rgba(0,0,0,0.5" }}
                    onClick={backdropClick}
                >
                    {error !== "" ? (
                        <div
                            className="absolute text-white bg-red-600 text-center rounded-md flex justify-center items-center p-3"
                            style={{
                                top: "10px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "400px",
                            }}
                        >
                            {error}
                        </div>
                    ) : null}
                    {!showLogin ? (
                        <div
                            className="absolute bg-white rounded-md p-5 w-2/6"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center gap-3">
                                <form
                                    className="flex flex-col justify-center items-center gap-4"
                                    onSubmit={(e) => void handleSignUp(e)}
                                >
                                    <input
                                        className="w-full p-3 rounded-md border-2 focus:outline-none hover:border-gray-800 bg-gray-300"
                                        required
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        className="w-full p-3 rounded-md border-2 focus:outline-none hover:border-gray-800 bg-gray-300"
                                        required
                                        type="Email"
                                        placeholder="Email"
                                    />
                                    <div>
                                        <input
                                            className="w-full p-3 rounded-md border-2 focus:outline-none hover:border-gray-800 bg-gray-300"
                                            required
                                            type="password"
                                            placeholder="Password"
                                        />
                                        <p className="text-sm text-gray-600">
                                            (minimum 6 characters)
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        role="button"
                                        className="bg-slate-900 px-6 py-2 rounded-md hover:bg-slate-700 text-white"
                                    >
                                        Sign up
                                    </button>
                                </form>
                                <p>
                                    Already have an account?{" "}
                                    <button
                                        role="button"
                                        type="button"
                                        className="font-bold hover:underline cursor-pointer"
                                        onClick={loginHandler}
                                    >
                                        Log In
                                    </button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="absolute bg-white rounded-md p-5 w-2/6"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center gap-3">
                                <form
                                    className="flex flex-col justify-center items-center gap-4"
                                    onSubmit={(e) => void handleLogin(e)}
                                >
                                    <input
                                        className="w-full p-3 rounded-md border-2 focus:outline-none hover:border-gray-800 bg-gray-300"
                                        required
                                        type="Email"
                                        placeholder="email"
                                    />
                                    <div>
                                        <input
                                            className="w-full p-3 rounded-md border-2 focus:outline-none hover:border-gray-800 bg-gray-300"
                                            required
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        role="button"
                                        className="bg-slate-900 px-6 py-2 rounded-md hover:bg-slate-700 text-white"
                                    >
                                        Log In
                                    </button>
                                </form>
                                <p>
                                    Don't have an account?{" "}
                                    <button
                                        role="button"
                                        type="button"
                                        className="font-bold hover:underline cursor-pointer"
                                        onClick={loginHandler}
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
            <ForecastDataFetcher
                searchUrlQuery={searchUrlQuery}
                dispatch={dispatchWeather}
            />
            <div className="h-screen w-full dark:bg-gray-900">
                <header>
                    <nav className="dark:bg-gray-800 flex justify-around items-center text-white py-5">
                        <h1 className="font-bold text-3xl">Weather Hub</h1>
                        <SearchForm />
                        {user?.loginStatus ? (
                            <div className="flex justify-center items-center gap-5">
                                <p>Welcome, {user?.user?.displayName}</p>
                                <button
                                    role="button"
                                    type="button"
                                    className="font-bold hover:underline cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                role="button"
                                type="button"
                                className="font-bold hover:underline cursor-pointer"
                                onClick={handleAuthModal}
                            >
                                Sign up
                            </button>
                        )}
                    </nav>
                </header>
                <section className="flex justify-center items-center mt-10 text-white">
                    <p className="text-2xl">
                        Sign up to save weather insights for your favorite
                        cities.
                    </p>
                </section>
                <main className="flex justify-center items-center mt-10">
                    <WeatherInfo />
                </main>
            </div>
        </>
    );
};

export default Public;
