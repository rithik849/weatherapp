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
        
        // const x = d3.scaleBand().range([0, dimensions.width]).padding(0.1);
        // const y = d3.scaleLinear().domain([0,50]).range([dimensions.height, 0]);

        const svg = d3.select(".graph")
        .append("svg")
        .style("min-width", dimensions.width + margin.left + margin.right + "px")
        .style("min-height",dimensions.height + margin.top + margin.bottom + "px")
        .style("background-color","red")
        .append("g")
        .style("translate", "translate(" + margin.left + "," + margin.top + ")")


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

        const yAxis = d3.scaleLinear().domain(minmaxTemperature).rangeRound([dimensions.height,0])

        // Plot x axis
        svg.append("g").attr("color","black").attr("transform","translate("+margin.left+","+(margin.top+dimensions.height)+")").call(
            d3.axisBottom(xAxis).tickFormat(
                (d) => d3.timeFormat('%H:%M')(d as Date)
            ).ticks(24)
        )

        svg.append("text")
        
        .attr("class","x-label")
        .attr("x",margin.left + dimensions.width/2)
        .attr("y",margin.top+dimensions.height + (margin.bottom*3/4))
        .style("text-anchor","middle")
        .text(this.state.x_label)
        

        // Plot y axis
        svg.append("g").attr("color","black").attr("transform","translate("+margin.left+","+margin.top+")").call(
            d3.axisLeft(yAxis)
        )

        svg.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x",-(margin.top + dimensions.height/2))
        .attr("y", margin.left/3)
        .style("text-anchor", "middle")
        .text(this.state.y_label)
        
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