import React, { Component } from 'react';
import './PowerBlock.css';
import Plus from '../Icons/Plus';
import IconButton from '../IconButton/IconButton';
import Save from '../Icons/Save';
import { Power } from '../DefaultCharacterSheets';


interface PowerBlockProps {
  tag?: string;
  powers: Power[];
  power: number;
  updatePower: (index: number, power: Power) => void;
  deletePower: (index: number) => void;
}

interface PowerBlockState {
  editingPowerIndex: number;
  editingPowerValue: number;
  editingPowerName: string;
}

class PowerBlock extends Component<PowerBlockProps, PowerBlockState> {
  constructor(props: PowerBlockProps) {
    super(props);

    this.state = {
      editingPowerName: "",
      editingPowerIndex: -1,
      editingPowerValue: 0
    }
  }

  handleCheckboxChange = (index: number) => {
    const updatedPower = this.props.powers[index];
    updatedPower.checked = !updatedPower.checked;
    this.props.updatePower(index, updatedPower);
  };

  saveEditingPower = () => {
    const updatedPower = this.props.powers[this.state.editingPowerIndex];
    updatedPower.value = this.state.editingPowerValue;
    updatedPower.name = this.state.editingPowerName;
    this.props.updatePower(this.state.editingPowerIndex, updatedPower);
    this.setState({editingPowerIndex: -1})
  }

  generateNewPower = (tags: string[]) => {
    return {
      name: "",
      value: 0,
      checked: false,
      tags: tags,
      intensity: "",
      cost: 1,
      description: ""
    }
  }

  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveEditingPower();
    }
    if (event.key === 'Escape') {
      this.discardEdits();
    }
  };

  discardEdits = () => {
    this.setState({editingPowerIndex: -1});
  }

  createNewPower = () => {
    this.props.updatePower(this.props.powers.length, this.generateNewPower(this.props.tag ? [this.props.tag] : []));
  }

  render() {
    const { powers } = this.props;

    return (
      <div className="Container">
        <div className="PowerCategoryHeader">
          <h2 className="PowerCategoryTitle">{this.props.tag}</h2>
          <IconButton onClick={this.createNewPower}><Plus /></IconButton>
        </div>
        {powers.map((power, index) => {
          if((this.props.tag && power.tags.indexOf(this.props.tag) < 0) || (!this.props.tag && power.tags.length != 0)) return <></>;
          else return (
            <div key={index} className="PowerItem">
              <div onClick={() => {this.setState({ editingPowerIndex: index, editingPowerValue: powers[index].value, editingPowerName: powers[index].name})}} className={"PowerName"}>
                {this.state.editingPowerIndex === index ? 
                  (
                    <div className={""}>
                      <input autoFocus 
                        value={this.state.editingPowerName} 
                        onChange={(e) => {this.setState({editingPowerName: e.target.value})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </div>
                  )
                  :
                  (
                    <span>{powers[index].name}</span>
                  )
                }
                
               </div>
               
               {this.state.editingPowerIndex === index ? 
                (
                  <div className={"PowerValueEdit"}>
                    <input autoFocus 
                      value={this.state.editingPowerValue} 
                      onChange={(e) => {this.setState({editingPowerValue: parseInt(e.target.value)})}}
                      onKeyDown={this.handleKeyDown}>
                    </input>
                  </div>
                )
                :
                (
                  <div onClick={() => {this.setState({ editingPowerIndex: index, editingPowerValue: powers[index].value, editingPowerName: powers[index].name})}} className={"PowerValue"}>
                    <span><b>{powers[index].value}%</b></span>
                  </div>
                )
               }
               
               
              <div className={"PowerValue"}>
                  <span><b>{(powers[index].value+this.props.power*5)}%</b></span><span>({Math.floor((powers[index].value+this.props.power*5)/2)}% / {Math.floor((powers[index].value+this.props.power*5)/5)}%)</span>
              </div>


              {this.state.editingPowerIndex === index ?
                (
                  <IconButton onClick={(event: any) => {this.saveEditingPower(); event?.stopPropagation();}}><Save /></IconButton>
                )
                :
                (
                  <div className={"Checkbox"}>
                      <input
                          type="checkbox"
                          checked={powers[index].checked || false}
                          onChange={(event: any) => {this.handleCheckboxChange(index); event?.stopPropagation();}}
                        />
                  </div>
                )
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default PowerBlock;
