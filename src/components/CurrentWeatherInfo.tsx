import { FC } from "react";
import tempIcon from "../assets/temp.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import cloudIcon from "../assets/cloud.png";
import pressureIcon from "../assets/pressure.png";
import visibilityIcon from "../assets/visibility.png";
import precipitationIcon from "../assets/precipitation.png";

const CurrentWeatherInfo: FC = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-11">
            <div className="flex justify-start items-center gap-2">
                <img src={tempIcon} className="w-10" />
                <p className="text-2xl text-white">22&#8451;</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={windIcon} className="w-10" />
                <p className="text-2xl text-white">22 kph</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={cloudIcon} className="w-10" />
                <p className="text-2xl text-white">22</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={humidityIcon} className="w-10" />
                <p className="text-2xl text-white">22</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={pressureIcon} className="w-10" />
                <p className="text-2xl text-white">1021mb</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={visibilityIcon} className="w-10" />
                <p className="text-2xl text-white">10 km</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <img src={precipitationIcon} className="w-10" />
                <p className="text-2xl text-white">0mm</p>
            </div>
        </div>
    );
};
export default CurrentWeatherInfo;
