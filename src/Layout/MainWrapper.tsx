import { FC } from "react";
import { IComponents } from "../types";

const MainWrapper: FC<IComponents> = ({ children }) => {
    return (
        <main className="flex justify-center items-center mt-10">
            {children}
        </main>
    );
};
export default MainWrapper;
