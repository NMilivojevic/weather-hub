import { FC } from "react";
import { IComponents } from "../types";

const Container: FC<IComponents> = ({ children }) => {
    return <div className="h-screen w-full dark:bg-gray-900">{children}</div>;
};
export default Container;
