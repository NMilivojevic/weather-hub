import { FC } from "react";

const CurrentWeatherPersonalized: FC = () => {
    return (
        <div className="border-l-2 border-sky-700 pl-4 flex flex-col items-center justify-start text-white gap-10 text-center">
            <div className="flex flex-col justify-center items-center text-center gap-3">
                <p className="text-xl">Good evening</p>
                <p className="">September 14, 2009 15:34</p>
            </div>
            <p className="text-md">Feels like 19 </p>
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl">Cloudy</p>
                <p>Cloudy icon</p>
            </div>
        </div>
    );
};
export default CurrentWeatherPersonalized;
