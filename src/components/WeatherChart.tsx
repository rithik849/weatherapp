import React from "react"
import {ScaleTime, ScaleLinear, axisBottom,extent,select, scaleTime, scaleLinear, timeFormat, axisLeft, line, selectAll,formatDefaultLocale} from 'd3'
import { DateTime } from "luxon"
import "../styles/WeatherChart.css"


interface GraphProps<T extends readonly string[] = readonly string[]> {

    time : T,
    temperature : {[K in keyof T] : number},
    x_label : string,
    y_label : string,
    x_units ?: string,
    y_units ?: string
    

}

type GraphPoint = [Date,number]

interface GraphState {
    points : GraphPoint[]
    x_label : string,
    y_label : string,
    x_units ?: string,
    y_units ?: string
}

class WeatherChart extends React.Component<GraphProps,GraphState> {
    constructor(props : GraphProps){
        super(props)
        this.state = {
            points : props.time.map((v,i) => [DateTime.fromFormat(v,"T").toJSDate() ,props.temperature[i]]),
            x_label : props.x_label,
            y_label : props.y_label,
            x_units : props.x_units,
            y_units : props.y_units

        }

    }

    drawChart(){
        if (this.state.points.length === 0){
            throw new Error('No data to plot!')
        }

        const margin = {top: 60, right: 80, bottom: 60, left: 60}
        const dimensions = {width : 1080 - margin.left - margin.right , height : 600 - margin.top - margin.bottom}

        const svg = select(".graph")
            //.style("min-height","300px")
            .append("svg")
            .style("min-width",`${dimensions.width+margin.left+margin.right}px`)
            .style("min-height", `${dimensions.height+margin.top+margin.bottom}px`)
            .attr("id","plot")
            .style("background-color","red")
            .append("g")
            

        

        const minmaxDate : [Date,Date]= extent(this.state.points, (d : GraphPoint) => d[0]) as [Date,Date]

        // Ensure 0 is lowest temperature displayed if all temperatures are 0 or greater
        const minmaxTemperature : [number,number] = extent(this.state.points, (d : GraphPoint) => d[1]) as [number,number]

        if (minmaxTemperature[0] >= 0){
            minmaxTemperature[0] = 0
        }

        const xAxis : ScaleTime<number,number,never> = scaleTime().domain(minmaxDate).rangeRound([0,dimensions.width])

        const yAxis : ScaleLinear<number,number> = scaleLinear().domain(minmaxTemperature).rangeRound([dimensions.height,0])
        // Add max and min tick
        let y_tick = yAxis.ticks()
        if (!(minmaxTemperature[0] in y_tick)){
            y_tick.push(minmaxTemperature[0])
        }

        if (!(minmaxTemperature[1] in y_tick)){
            y_tick.push(minmaxTemperature[1])
        }
        // Plot x axis and label
        svg.append("g")
        .attr("color","black")
        .attr("transform","translate("+margin.left+","+(margin.top+dimensions.height)+")")
        .call(
            axisBottom(xAxis).tickFormat(
                (d) => timeFormat('%H:%M')(d as Date)
                ).ticks(24)
            ).style("font-size","0.8rem")

        svg.append("text")
        .attr("class","x-label")
        .attr("x",margin.left + dimensions.width/2)
        .attr("y",(margin.top+dimensions.height + (margin.bottom/1.5)) + "px")
        .style("text-anchor","middle")
        .text(this.state.x_label + (this.state.x_units ? (" (" + this.state.x_units+")") : ""))
        

        // Plot y axis and label
        svg.append("g")
        .attr("color","black")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .call(
            axisLeft(yAxis)
            .tickValues(y_tick)
            ).style("font-size","1rem")

        svg.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x",-(margin.top + dimensions.height/2))
        .attr("y",(margin.left/3) + "px")
        .style("text-anchor", "middle")
        .text(this.state.y_label + (this.state.y_units ? (" (" + this.state.y_units+")"): ""))




        // Tooltip
        // create a tooltip
        
        
        const Tooltip = select(".graph")
        .append("div")
        .attr("class", "tooltip")
        .attr("data-testid","tooltip")
        .style("visibility", "hidden")
        .style("background-color", "blue")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position","absolute")
        .attr("name","tooltip")

        const x_units : string | undefined = this.state.x_units !== undefined ? this.state.x_units : ""
        const y_units : string | undefined = this.state.y_units !== undefined ? this.state.y_units : ""
            

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function(this : SVGElement ,event : any, d : GraphPoint) {
            Tooltip.style("visibility", "visible").style("opacity",0.5).attr("role","button")
        }

        const mousemove = function(this : SVGElement ,event : any, d : GraphPoint) {
            
            const display : string = timeFormat("%H:%M")(d[0] as Date) + x_units +  "," + d[1] + y_units 

            Tooltip
            .html(display)
            .style("position","fixed")
            .style("left", (event.pageX-60) + "px")
            .style("top", (event.pageY-60) + "px")
        }

        const mouseleave = function(this : SVGElement ,event : any, d : GraphPoint) {
            Tooltip
            .style("visibility", "hidden")
        }

        // Plot graph

        svg.append("path")
        .datum(this.state.points)
        .attr("id","line")
        .attr("fill", "none")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", line(
            (d: GraphPoint) => {return xAxis(d[0])}, (d : GraphPoint) => {return yAxis(d[1])}
            )
        )

        svg.append('g')
        .selectAll("dot").data(this.state.points ).enter()
        .append("circle")
          .attr("cx", function (d : GraphPoint) { return xAxis(d[0]); } )
          .attr("cy", function (d : GraphPoint) { return yAxis(d[1]); } )
          .attr("r", 7)
          .style("fill", "#69b3a2")
          .style("opacity", 1)
          .style("stroke", "white")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("role","application")
          .attr("aria-label","point")
        .on("mouseover",mouseover)
        .on("mousemove",mousemove)
        .on("mouseout",mouseleave)
    
    }

    componentWillUnmount(): void {
        selectAll('svg').remove()
    }



    componentDidMount(): void {
        try{
            this.drawChart()
        }
        catch(e){
            console.error(e)
        }
        

    }

    render(): React.ReactNode {
        return <div className = 'graph'></div>
            
    }

}


export default WeatherChart