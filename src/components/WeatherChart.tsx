import React from "react"
import * as d3 from "d3"


interface GraphProps<T extends readonly [] | readonly string[] = readonly string[]> {

    time : T,
    temperature : {[K in keyof T] : number},
    

}

class WeatherChart extends React.Component<GraphProps> {
    constructor(props : GraphProps){
        super(props)
        this.state = {
            time : props.time,
            temp : props.temperature
        }

    }

    drawChart(){
        console.log(this.state)
        const margin = {top: 10, right: 30, bottom: 30, left: 60}
        const dimensions = {width : 1080 - margin.left - margin.right , height : 300 - margin.top - margin.bottom}
        
        const x = d3.scaleBand().range([0, dimensions.width]).padding(0.1);
        const y = d3.scaleLinear().domain([0,50]).range([dimensions.height, 0]);

        const svg = d3.select(".graph")
        .append("svg")
        .attr("min-width", dimensions.width + margin.left + margin.right + "px")
        .attr("min-height",dimensions.height + margin.top + margin.bottom + "px")
        .style("background-color","red")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        
    }

    componentWillUnmount(): void {
        d3.selectAll('svg').remove()
    }



    componentDidMount(): void {
        this.drawChart()
        

    }

    render(): React.ReactNode {
        return <div className = 'graph'></div>
    }

}


export default WeatherChart