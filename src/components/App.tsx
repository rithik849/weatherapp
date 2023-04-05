import Forecast from './Forecast'
import ErrorPage from "./ErrorPage"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import DayForecast from './DayForecast';


const App : React.FC = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index path="/" element = {<Forecast/>} />
                <Route path = "/:day" element = {<DayForecast />} />
                <Route path = "*" element = {<ErrorPage />} />
            </Route>
    ))


    return (
        <RouterProvider router = {router}/>
    )
};

export default App
