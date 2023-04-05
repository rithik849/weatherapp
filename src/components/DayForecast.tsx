import { useNavigate, useParams } from "react-router-dom"

type IDayLoader = {
    day : string,

};

const DayForecast : React.FC = (props) => {
    const navigate = useNavigate()
    const params = useParams()

    const isDay : boolean = !!params.day && ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].includes(params.day)



    return <>
    'hi'
    <button onClick={() => navigate(-1)}>Back</button>
    </>
}

function loader({request, params} : {request : Request, params : IDayLoader}) : Response {
    
}

export default DayForecast