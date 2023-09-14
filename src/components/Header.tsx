import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";

const Header: FC = () => {
    // The `state` arg is correctly typed as `RootState` already
    const currentWeather = useAppSelector((state) => state.currentWeather);
    // const dispatch = useAppDispatch();
    console.log(currentWeather);

    return (
        <header>
            <nav className="dark:bg-gray-800 flex justify-center items-center text-white py-5">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Lookup weather for a specific city..."
                    className="p-2 rounded-md w-2/6 focus:outline-none focus-visible:ring text-slate-900"
                />
            </nav>
        </header>
    );
};
export default Header;
