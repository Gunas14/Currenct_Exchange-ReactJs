import React from 'react';
import "./history.css";
import {InputGroup, Form, Button} from 'react-bootstrap';
import HistoryTable from './historyTable';
import HistoryChart from "./historyChart";


export default class history extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currencyName : "",
            historicalData : [],
            isToShowTable : true,
            isInvalidCurrency : true
        }
    }
    
    handleChange(value) {
        this.setState({ currencyName: value });
    }

    componentDidMount(){
        var parts = this.props.location.pathname.split('/');
        var lastSegment = parts.pop();  // handle potential trailing slash
       
        if(lastSegment !== "history"){
            this.setState({ currencyName: lastSegment.toUpperCase()});
            getHistory(this, lastSegment);
            this.setState({isToShowTable : false});
        }
    }

    showTable(bool){
        this.setState({isToShowTable : bool});
    }
    keyPressed(self, event){
        if(event.key === 'Enter'){
            getHistory(self, this.state.currencyName);
        }
    }
    
    render(){
        return(
            <div id="historyDiv">
                <div id="searchBarDiv" className="d-flex">
                    
                    <InputGroup size="lg" id="searchInputGroup">
                        <Form.Control type="Text" value={this.state.currencyName} onKeyPress ={(event) =>this.keyPressed(this, event)} onChange={(e)=>this.handleChange(e.target.value)} placeholder="Enter a currency code" />
                    </InputGroup>
                    
                    <Button variant="primary" id="getHistoryBtn" onClick={() => getHistory(this, this.state.currencyName)}>Get history</Button>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick ={() => this.showTable(true)}>Table</button>
                        <button type="button" className="btn btn-secondary" onClick ={() => this.showTable(false)}>Graph</button>
                    </div>
                </div>
                <div >{(!(this.state.isInvalidCurrency) &&
                    <span className="w-100 ml-5 display-4 text-center">Please enter a valid currency</span>)}
                </div>
                <div  >{(this.state.isInvalidCurrency) &&
                    <div id="historyTblDiv" className="d-flex">{ (this.state.isToShowTable) ? 
                        <HistoryTable historicalData = {this.state.historicalData['bpi']}/>  : 
                        <HistoryChart id="historicalData1" historicalData = {this.state.historicalData}/> }
                    </div>}
                </div>
                
            </div>
        )   
    }
}

function getHistory(self, curr){
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+curr)
    .then(response => response.json())
    .then((historicalData) => {
        self.setState({ isInvalidCurrency : true});
        self.setState({historicalData : historicalData});})
    .catch(e => self.setState({ isInvalidCurrency : false}))
}
