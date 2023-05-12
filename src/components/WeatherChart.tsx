import React from "react"
import * as d3 from "d3"
import { DateTime } from "luxon"


interface GraphProps<T extends readonly string[] = readonly string[]> {

    time : T,
    temperature : {[K in keyof T] : number},
    units : Record<string,string>
    

}

type GraphPoint = [Date,number]

interface GraphState {
    points : GraphPoint[],
    units : Record<string,string>
}

class WeatherChart extends React.Component<GraphProps,GraphState> {
    constructor(props : GraphProps){
        super(props)
        this.state = {
            points : props.time.map((v,i) => [DateTime.fromFormat(v,"T").toJSDate() ,props.temperature[i]]),
            units : props.units
        }

    }

    drawChart(){
        if (this.state.points.length === 0){
            throw new Error('No data to plot!')
        }
        console.log(this.state)
        const margin = {top: 10, right: 30, bottom: 30, left: 60}
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

        svg.append("g").attr("transform","translate("+margin.left+","+dimensions.height+")").call(
            d3.axisBottom(xAxis).tickFormat(
                (d) => d3.timeFormat('%H:%M')(d as Date)
            ).ticks(24)
        )

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