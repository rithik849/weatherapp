import { render, waitFor, screen, fireEvent, RenderResult, cleanup } from "@testing-library/react"
import WeatherChart from "./WeatherChart"
import { DateTime } from "luxon"
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import userEvent from "@testing-library/user-event"
import { min } from "d3"

let renderResult : RenderResult | null = null;

const dummy_time_data : readonly string[] = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00"
]

const dummy_temperature_data : number[] = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48]

describe("Test Weather Chart Plot", () => {
  
    test("Graph tooltip renders correctly", async () => {
      const {asFragment,getAllByRole, getByText, getByTestId} = render(<WeatherChart time = {dummy_time_data} temperature = {dummy_temperature_data} x_label ="Time" y_label ="Temperature" y_units="C"/>)
      expect(asFragment()).toMatchSnapshot()
      let user : UserEvent = userEvent.setup()

      for (let i = 0; i < dummy_temperature_data.length; i++){
        let element : HTMLElement = getAllByRole("application",{hidden:true, name: "point"})[i]

        await userEvent.hover(element)
        element = getByText(/[0-9][0-9]:[0-9][0-9],([0-9]*)/)
        expect(element.innerHTML).toMatch(/[0-9][0-9]:[0-9][0-9],([0-9]*)/)
        expect(element.innerHTML).toStrictEqual(dummy_time_data[i] + "," + dummy_temperature_data[i]+"C")
      }
    }
    
    )

    test("Correct X and Y labels",async () => {
        const {getByText} = render(<WeatherChart time = {dummy_time_data} temperature = {dummy_temperature_data} x_label ="Time" y_label ="Temperature" y_units="C"/>)
        let y_label =  getByText("Temperature (C)")
        let x_label = getByText("Time")
        

        expect(x_label).toBeDefined()
        expect(x_label.innerHTML).toStrictEqual("Time")

        expect(y_label).toBeDefined()
        expect(y_label.innerHTML).toStrictEqual("Temperature (C)")
          
    })

    test("Correct Scale of y Axis at 0",async () => {
      let {queryByText} = render(<WeatherChart time = {dummy_time_data} temperature = {dummy_temperature_data} x_label ="Time" y_label ="Temperature" y_units="C"/>)
      let min_y =  queryByText("0")

      expect(min_y).not.toBeNull()
    })
    
    test("Correct Scale of y Axis less than 0", async() => {
      let {debug,getByText,findByText} = render(<WeatherChart time = {dummy_time_data} temperature = {dummy_temperature_data.map(d => d-24)} x_label ="Time" y_label ="Temperature" y_units="C"/>)
      // debug()
      // Need to account for d3 minus locale https://github.com/d3/d3-format/issues/62
      let min_y = getByText(/(-|−)22/) 

      expect(min_y).not.toBeNull()

      let max_y = getByText(/24/)
      expect(max_y).not.toBeNull()
    })

    afterEach(()=>{
      cleanup()
    })

})


export {dummy_time_data, dummy_temperature_data}