import { QueryParams, LatLong, URL_Type } from "./project_types/types"
//import { URLSearchParams } from "url"
import {DateTime} from "luxon"

export function date_format(date : string , input_format : string, output_format : string){
    const dt = DateTime.fromFormat(date,input_format)
    return dt.toFormat(output_format)
}


// Convert the query params to a format that URLSearchParams can use
function paramsToQuery(params : QueryParams) : Record<string,string> {
    return Object.entries(params).reduce(
                  (acc, [k, v]) => ({...acc, [k]: "" + v}),
                {}) as Record<string,string>;
}

// Build the query
export function api_query(url : URL_Type, params : QueryParams) {
    const api_query : URLSearchParams = new URLSearchParams(paramsToQuery(params))
    return url + api_query
}


export function is_valid_date(date:string) : boolean{
    // Format should be of the form date-month-year with 0 padding

    const a : DateTime = DateTime.fromFormat(date,'dd-MM-yyyy')

    return a.isValid


}


