import { Forecast } from './Forecast'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


const App : React.FC = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
            <Route path="/" element = {<Forecast/>} />
            <Route path="*" element = {<h1>Err</h1>} />
            </Route>
    ))


    return (
        <RouterProvider router = {router}/>
    )
};

export default App
