
import React from 'react';
import "./currency.css"
import currencyList from "../../helpers/currencyList";
import ListGroup from 'react-bootstrap/ListGroup';

function header() {
    const headerContent = <div id="headerDiv" className="d-flex w-100">
        <div id="headerTitle" className="w-100">Currency List</div>
        {/* <button></button>
        <div>
            <button></button>
            <button></button>
        </div> */}
    </div>
    return headerContent;
}

function listview(details) {
    const items = [];
    for (const index in details) {
        items.push(<ListGroup.Item key={index} variant={(index % 2 === 1) ? "secondary" : ""} action href={"history/" + (details[index].currency).toLowerCase()}>
            <div className="d-flex w-100">
                <div className="w-75"> {details[index].country} </div>
                <div className="w-25 text-center">{details[index].currency}</div>
            </div>
        </ListGroup.Item>);
    }
    return items;
}

export default class currency extends React.Component {
    render() {
        return (
            <div className="w-100">
                <div>
                    {header()}
                </div>
                <div id="horizontalLine"></div>
                <div id="listDiv">
                    <div id="listHeader" className="w-100">
                        <label className="w-75 text-white font-weight-bold">Country</label>
                        <label className="w-25 text-center text-white font-weight-bold">Currency</label>
                    </div>
                    <div id="listContent" className="w-100 overflow-auto">
                        <ListGroup>{listview(currencyList)}</ListGroup>
                    </div>
                </div>
            </div>
        )
    }
}