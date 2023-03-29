

export function date_reformat(date : string){
    const tmp_date = new Date(date)

    return tmp_date.getDate().toString() +"/"+ (tmp_date.getMonth()+1).toString() + "/" + tmp_date.getFullYear().toString()
}