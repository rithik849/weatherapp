import React from "react"
import * as d3 from "d3"
import { DateTime } from "luxon"


interface GraphProps<T extends readonly string[] = readonly string[]> {

    time : T,
    temperature : {[K in keyof T] : number},
    units : Record<string,string>
    x_label : string
    y_label : string
    

}

type GraphPoint = [Date,number]

interface GraphState {
    points : GraphPoint[]
    x_label : string,
    y_label : string
}

class WeatherChart extends React.Component<GraphProps,GraphState> {
    constructor(props : GraphProps){
        super(props)
        this.state = {
            points : props.time.map((v,i) => [DateTime.fromFormat(v,"T").toJSDate() ,props.temperature[i]]),
            x_label : props.x_label,
            y_label : props.y_label

        }

    }

    drawChart(){
        if (this.state.points.length === 0){
            throw new Error('No data to plot!')
        }

        console.log(this.state)
        const margin = {top: 10, right: 30, bottom: 50, left: 60}
        const dimensions = {width : 1080 - margin.left - margin.right , height : 300 - margin.top - margin.bottom}

        const svg = d3.select(".graph")
        .append("svg")
        .style("min-width", dimensions.width + margin.left + margin.right + "px")
        .style("min-height",dimensions.height + margin.top + margin.bottom + "px")
        .style("background-color","red")
        .append("g")
        


        const minmaxDate : [Date,Date]= d3.extent(this.state.points, (d : GraphPoint) => d[0]) as [Date,Date]
        console.log('minMaxDate')
        console.log(minmaxDate)

        // Ensure 0 is lowest temperature displayed if all temperatures are 0 or greater
        const minmaxTemperature : [number,number] = d3.extent(this.state.points, (d : GraphPoint) => d[1]) as [number,number]
        if (minmaxTemperature[0] > 0){
            minmaxTemperature[0] = 0
        }
        console.log('minMaxTemperature')
        console.log(minmaxTemperature)

        const xAxis : d3.ScaleTime<number,number,never> = d3.scaleTime().domain(minmaxDate).rangeRound([0,dimensions.width])

        const yAxis : d3.ScaleLinear<number,number> = d3.scaleLinear().domain(minmaxTemperature).rangeRound([dimensions.height,0])

        // Plot x axis and label
        svg.append("g")
        .attr("color","black")
        .attr("transform","translate("+margin.left+","+(margin.top+dimensions.height)+")")
        .call(
            d3.axisBottom(xAxis).tickFormat(
                (d) => d3.timeFormat('%H:%M')(d as Date)
                ).ticks(24)
            )

        svg.append("text")
        .attr("class","x-label")
        .attr("x",margin.left + dimensions.width/2)
        .attr("y",(margin.top+dimensions.height + 40) + "px")
        .style("text-anchor","middle")
        .text(this.state.x_label)
        

        // Plot y axis and label
        svg.append("g")
        .attr("color","black")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .call(
            d3.axisLeft(yAxis)
            )

        svg.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x",-(margin.top + dimensions.height/2))
        .attr("y",(margin.left - 40) + "px")
        .style("text-anchor", "middle")
        .text(this.state.y_label)




        // Tooltip
        // create a tooltip
        
        
        const Tooltip = d3.select(".graph")
        .append("div")
            .style("visibility", "hidden")
            .attr("class", "tooltip")
            .style("background-color", "blue")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            //.style("position","absolute")
            

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function(this : SVGCircleElement ,event : any, d : GraphPoint) {
            Tooltip.style("visibility", "visible")
        }

        const mousemove = function(this : SVGCircleElement ,event : any, d : GraphPoint) {
            Tooltip
            .html("The exact value of<br>this cell is: " + d)
            .style("left", (event.target[0]) + "px")
            .style("top", (event.target[1]) + "px")
        }

        const mouseleave = function(this : SVGCircleElement ,event : any, d : GraphPoint) {
            Tooltip
            .style("visibility", "hidden")
        }

                // Plot graph

        // svg.append("path")
        // .datum(this.state.points)
        // .attr("id","line")
        // .attr("fill", "none")
        // .attr("transform","translate("+margin.left+","+margin.top+")")
        // .attr("stroke", "black")
        // .attr("stroke-width", 1.5)
        // .attr("d", d3.line(
        //     d => {return xAxis(d[0])}, d => {return yAxis(d[1])}
        //     )
        // )

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
        .on("mouseover",mouseover)
        .on("mousemove",mousemove)
        .on("mouseleave",mouseleave)
    
    }

    componentWillUnmount(): void {
        d3.selectAll('svg').remove()
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