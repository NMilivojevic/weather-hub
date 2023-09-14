import { FC } from "react";
import { IComponents } from "../types";

const CurrentWeatherContentWrapper: FC<IComponents> = ({ children }) => {
    return (
        <div className="py-8 flex justify-between items-center">{children}</div>
    );
};
export default CurrentWeatherContentWrapper;
