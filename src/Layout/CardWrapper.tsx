import { FC } from "react";
import { IComponents } from "../types";

const CardWrapper: FC<IComponents> = ({ children }) => {
    return (
        <section className="rounded-xl p-5 w-4/5 text-white shadow-xl shadow-gray-950 bg-sky-900">
            {children}
        </section>
    );
};
export default CardWrapper;
