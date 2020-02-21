import React from 'react';
import "./conversion.css";
import currencyList from "../../helpers/currencyList";
import InputComponents from "./selectionPanel";
import DisplayPanel from "./displayPanel";

export default class conversion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            baseCurrencyName : "GBP",
            targetCurrencyName : "USD",
            baseCurrencyList:[], 
            targetCurrencyList: [],
            showBaseList: false,
            showTargetList: false,
            baseAmount : 1,
            targetAmount : "",
            maxDataArray :  {"date" : "" , "value": "" },
            MinDataArray :  {"date" : "" , "value": "" },
        };
        this.selectedBaseCurrency = this.selectedBaseCurrency.bind(this);
        this.selectedTargetCurrency = this.selectedTargetCurrency.bind(this);
        this.updateBaseAmount = this.updateBaseAmount.bind(this);

    }


    filterCurrency(value){
        var updatedList = currencyList;
        updatedList = updatedList.filter(function(item){
          return item.currency.toLowerCase().search(value.toLowerCase()) !== -1;
        });
        return updatedList; 
    }

    prepareTargetCurrencyList(value){
        this.setState({targetCurrencyName: value });
        this.setState({targetCurrencyList: this.filterCurrency(value) });
        this.setState({showTargetList : true});
    }

    prepareBaseCurrencyList(value){
        this.setState({baseCurrencyName: value });
        this.setState({baseCurrencyList: this.filterCurrency(value) });
        this.setState({showBaseList : true});
    }

    selectedBaseCurrency(e){
        this.setState({baseCurrencyName: (e.target.innerHTML).trim() });
        this.setState({showBaseList : false});
    }
    selectedTargetCurrency(e){
        this.setState({targetCurrencyName: (e.target.innerHTML).trim() });
        this.setState({showTargetList : false});
    }
    async updateBaseAmount(e){
        this.setState({baseAmount : e.target.value});

        var baseCurrencyJSON = await getHistoryWithname(this.state.baseCurrencyName);
        var targetCurrencyJSON =  await getHistoryWithname(this.state.targetCurrencyName);
        
        const baseKeys = Object.keys(baseCurrencyJSON);
        const targetKeys = Object.keys(targetCurrencyJSON);

        const baseAmountTdyVal = baseCurrencyJSON[baseKeys[0]];
        const targetAmountTdyVal = targetCurrencyJSON[targetKeys[0]];

        var targetvalue = ((targetAmountTdyVal * this.state.baseAmount)/ baseAmountTdyVal);
        this.setState({targetAmount : targetvalue});
        
        var maxVal= 0;
        var minVal = 0;
        var maxDate = "";
        var minDate = "";
        for(var key of baseKeys){
            const baseVal = baseCurrencyJSON[key];
            const targetVal = targetCurrencyJSON[key];
           
            const value = targetVal/ baseVal;
            if(maxVal === 0 ||  value > maxVal){
                maxDate = key;
                maxVal = value;
            }
            if(minVal === 0 ||  value < minVal){
                minDate = key;
                minVal = value;
            }
        }
        this.setState({
            maxDataArray: {"date" : maxDate , "value": maxVal },
        });

        this.setState({
            MinDataArray :{"date" : minDate , "value": minVal },
        });
        
    }

    render(){
        return(
            <div id="conversionDiv"  >
                <div className="bg-light" id="conversionInputDiv">
                    <div id="conversionInputLeftDiv" className="inputDivs">
                        <InputComponents onChange={(e)=>this.prepareBaseCurrencyList(e.target.value)} 
                        placeholder="Enter base currency code"
                        componentName = "baseCurrency"
                        sortedArray = {this.state.baseCurrencyList}
                        actionOnSelection = {this.selectedBaseCurrency}
                        selectedCurr = {this.state.baseCurrencyName}
                        showList = {this.state.showBaseList}
                        updateAmount = {this.updateBaseAmount}
                        />
                    </div>
                    <div id="conversionInputRightDiv" className="inputDivs">
                        <InputComponents onChange={(e)=>this.prepareTargetCurrencyList(e.target.value)} 
                        componentName = "targetCurrency"
                        placeholder="Enter target currency code"
                        sortedArray = {this.state.targetCurrencyList}
                        actionOnSelection = {this.selectedTargetCurrency}
                        selectedCurr = {this.state.targetCurrencyName}
                        showList = {this.state.showTargetList}
                        updateAmount = {this.state.targetAmount}
                        />
                    </div>
                </div>
                <div>
                    <DisplayPanel header="MAX DIFFERENCE ON" array={this.state.maxDataArray} baseCurrencyName={this.state.baseCurrencyName} targetCurrencyName={this.state.targetCurrencyName}/>
                    <DisplayPanel header="MIN DIFFERENCE ON" array={this.state.MinDataArray} baseCurrencyName={this.state.baseCurrencyName} targetCurrencyName={this.state.targetCurrencyName}/>
                </div>
            </div>
        )
    }
}

// function getHistoryWithname(curr){
//     return new Promise((resolve, reject) => {
//         fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+curr)
//         .then(response => response.json())
//         .then((historicalData) => {
//             resolve(
//                 historicalData['bpi']
//             );
//             reject("Error");
//         })
//         .catch();
//       });
// }

function getHistoryWithname(curr){
  return fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+curr)
    .then(response => response.json())
    .then((historicalData) => {
            return historicalData['bpi']
    })
    .catch();

}