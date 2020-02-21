import React from 'react';
import "./displayPanel.css"

export default class display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                <div className="w-100 d-flex font-weight-bold bg-light minMaxDetails">
                    <span className="w-50 ">
                        <label className="ml-4 mt-3 subHeaderLabel">{this.props.header}</label>
                        <label className="dateLabel">{this.props.array.date}</label>
                    </span>
                    <span className="w-50 d-flex">
                        <span className="baseCurrencySpan">
                            <label className="currencyName">{this.props.baseCurrencyName}</label>
                            <label className="currencyValue">1</label>
                        </span>
                        <span className="targetCurrencySpan">
                            <label className="currencyName">{this.props.targetCurrencyName}</label>
                            <label className="currencyValue">{this.props.array.value}</label>
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}