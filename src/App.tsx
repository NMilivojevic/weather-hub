import { FC } from "react";

import Public from "./pages/Public";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: FC = () => {
    return (
        <Provider store={store}>
            <Public />;
        </Provider>
    );
};

export default App;
