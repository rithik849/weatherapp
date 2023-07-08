import WeeklyForecast from './WeeklyForecast'
import ErrorPage from "./ErrorPage"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import DailyForecast, {hourlyForecastLoader} from './DailyForecast';
import CountryProvider from '../context';

const App : React.FC = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index path="/" element = {<WeeklyForecast/>} />
                <Route path = "/:day" loader = {hourlyForecastLoader} element = {<DailyForecast />} />
                <Route path = "*" element = {<ErrorPage />} />
            </Route>
    ))


    return (
        <CountryProvider>
            <RouterProvider router = {router}/>
        </CountryProvider>
    )
};

export default App
