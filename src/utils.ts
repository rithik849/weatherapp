import { QueryParams, LatLong, URL_Type } from "./project_types/types"
//import { URLSearchParams } from "url"


export function date_reformat(date : string){
    const tmp_date = new Date(date)

    return tmp_date.getDate().toString() +"/"+ (tmp_date.getMonth()+1).toString() + "/" + tmp_date.getFullYear().toString()
}

function paramsToQuery(params : QueryParams) : Record<string,string> {
    return Object.entries(params).reduce(
                  (acc, [k, v]) => ({...acc, [k]: "" + v}),
                {}) as Record<string,string>;
}

export function api_query(url : URL_Type, params : QueryParams) {
    const api_query : URLSearchParams = new URLSearchParams(paramsToQuery(params))
    return url + api_query
}


