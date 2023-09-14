import { FC } from "react";
import Container from "../Layout/Container";
import Header from "../components/Header";
import MainWrapper from "../Layout/MainWrapper";
import CardWrapper from "../Layout/CardWrapper";
import MainTitle from "../components/MainTitle";
import Tabs from "../components/Tabs";
import CurrentWeatherContentWrapper from "../Layout/CurrentWeatherContentWrapper";
import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import CurrentWeatherPersonalized from "../components/CurrentWeatherPersonalized";

const Public: FC = () => {
    // useEffect(() => {
    //     const test = async () => {
    //         const url =
    //             "https://weatherapi-com.p.rapidapi.com/current.json?q=Paris";
    //         const options = {
    //             method: "GET",
    //             headers: {
    //                 "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
    //                 "X-RapidAPI-Host": import.meta.env.VITE_X_RapidAPI_Host,
    //             },
    //         };

    //         try {
    //             const response = await fetch(url, options);
    //             const result = await response.text();
    //             console.log(result);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     // test();
    // }, []);
    return (
        <Container>
            <Header />
            <MainWrapper>
                <CardWrapper>
                    <MainTitle />
                    <Tabs />
                    <CurrentWeatherContentWrapper>
                        <CurrentWeatherInfo />
                        <CurrentWeatherPersonalized />
                    </CurrentWeatherContentWrapper>
                </CardWrapper>
            </MainWrapper>
        </Container>
    );
};
export default Public;
