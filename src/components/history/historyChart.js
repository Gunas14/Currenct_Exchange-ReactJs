import React from "react";
import "./historyChart.css";
import * as d3 from 'd3';


export default class historyGraph extends React.Component{
    constructor(props){
        super(props);
        this.state= { id : props.id};
    }


    componentDidUpdate(){
        
        document.getElementById(this.props.id).innerHTML = "";
        if(this.props.historicalData === "" || this.props.historicalData.length === 0){
            return ;
        }
        this.drawChart(this.parseData(this.props.historicalData));
    }

    componentDidMount(){
        
        document.getElementById(this.props.id).innerHTML = "";
        if(this.props.historicalData === "" || this.props.historicalData.length === 0){
            return ;
        }
        this.drawChart(this.parseData(this.props.historicalData));
    }

    parseData(data) {
        var arr = [];
        for (var i in data.bpi) {
            arr.push({
                date: new Date(i), //date
                value: +data.bpi[i] //convert string to number
            });
        }
        return arr;
    }

    drawChart(data) {
        var svgWidth = 600, svgHeight = 400;
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        
        var svg = d3.select("#"+this.state.id).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleTime()
            .rangeRound([0, width]);
        
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);
        
        var line = d3.line()
            .x(function(d) { return x(d.date)})
            .y(function(d) { return y(d.value)})
            x.domain(d3.extent(data, function(d) { return d.date }));
            y.domain(d3.extent(data, function(d) { return d.value }));
        
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();
        
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");
        
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        }

    render(){
    return(
        <div id={this.state.id}></div>
        )
    }
}    
