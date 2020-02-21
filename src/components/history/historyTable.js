import React from "react";
import "./historyTable.css";

export default class historyTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        if(this.props.historicalData === undefined || this.props.historicalData.length === 0){
            return(
                <div>No data to display</div>
            )
        }else{
            return(
                splitTable(this.props.historicalData)
            )
        }
    }
}

function createTable(historicalDataArray, keysToDisplay){
    const table =
     <div id="tableSpan">
        <table className="table table-bordered table-striped">
            <thead>
                <tr  className="bg-secondary text-white">
                    <th scope="col col-sm">Date</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                {createRow(historicalDataArray, keysToDisplay)}
            </tbody>
        </table>
    </div>  
    return table;
}

function createRow(historicalDataArray, keysToDisplay){
    
    const rows = [];
    for(const key of keysToDisplay){
        rows.push(
        <tr key={key}>
             <td >{key}</td>
             <td >{historicalDataArray[key]}</td>
        </tr>);
    }

    return rows;
}

function splitTable( historicalData){
    if(historicalData === undefined || historicalData.length === 0){
        return;
    }

    var keys = Object.keys(historicalData);
    var totalTbl = Math.ceil(keys.length / 11);
    var allTable = []; 

    for(var i=0; i< totalTbl; i++){
        var lastIndex = ((i+1)*11);
        if(((i+1)*11)-1 > keys.length){
            lastIndex = keys.length 
        }
        
        var keysToDisplay = keys.slice(i*11, lastIndex)
        
        allTable.push(
            <div key={i}>{createTable(historicalData, keysToDisplay)}</div>
        )
    }
    return allTable;
}