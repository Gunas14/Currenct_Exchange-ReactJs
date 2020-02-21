import React from 'react';
import "./selectionPanel.css";
import {InputGroup, Form, ListGroup} from 'react-bootstrap';

export default class InputComponents extends React.Component{
    constructor(props){
        super(props);
         this.state = {
         };
    }

    render(){
        return(
            <div >
                <div className="d-flex">
                    <div  className="w-25 p-3 font-weight-bold">
                        Currency Name
                    </div>
                    <div  className="w-50">
                        <InputGroup size="lg">
                            <Form.Control type="Text" value={this.props.selectedCurr} onChange={this.props.onChange} placeholder={this.props.placeholder}/>
                        </InputGroup>
                    </div>
                </div>
                <div className="d-flex" style={{ marginTop: '5vh'}}>
                    <div  className="w-25 p-3 font-weight-bold">
                        Amount
                    </div>
                    <div  className="w-50">
                        <InputGroup size="lg">
                            {(this.props.componentName === "targetCurrency") ?  
                            <Form.Control disabled type="Text" placeholder="Enter the amount" value={this.props.updateAmount}/> :
                            <Form.Control type="Text" placeholder="Enter the amount" value={this.state.baseAmount}onChange={this.props.updateAmount} />
                        }    
                        </InputGroup>
                    </div>
                </div>
                <div id="listviewDiv" style={(this.props.showList)? {zIndex: 10}:{zIndex: -10}}>
                    {
                        (this.props.showList)?
                        <ListGroup onClick={this.props.actionOnSelection}>
                            {
                                this.props.sortedArray.map(function(item, i){ 
                                return <ListGroup.Item  variant="dark" key={i}
                                >{item.currency} </ListGroup.Item> 
                            })}
                        </ListGroup>  :  null
                    }
                </div>
            </div>
        )
   }
}