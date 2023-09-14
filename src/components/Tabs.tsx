import { FC } from "react";

const Tabs: FC = () => {
    return (
        <div className="w-full flex justify-start items-center gap-4 border-b-2 pb-3 border-sky-700">
            <div className="p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer">
                Current weather
            </div>
            {/* <div className="p-2 bg-sky-700 hover:bg-blue-700 rounded-md cursor-pointer">
        Forecast
    </div> */}
        </div>
    );
};
export default Tabs;
