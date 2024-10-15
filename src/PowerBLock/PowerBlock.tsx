import React, { Component, Fragment } from 'react';
import './PowerBlock.css';
import Plus from '../Icons/Plus';
import IconButton from '../IconButton/IconButton';
import Save from '../Icons/Save';
import { Power } from '../DefaultCharacterSheets';
import UnfocusHandler from '../UnfocusHandler/UnfocusHandler';


interface PowerBlockProps {
  tag?: string;
  powers: Power[];
  power: number;
  updatePower: (index: number, power: Power) => void;
  deletePower: (index: number) => void;
}

interface PowerBlockState {
  editingPowerIndex: number;
  editingPowerValue?: number;
  editingPowerName?: string;
  editingPowerCost?: number;
  editingPowerIntensity?: string;
  editingPowerDescription?: string;
}

class PowerBlock extends Component<PowerBlockProps, PowerBlockState> {
  constructor(props: PowerBlockProps) {
    super(props);

    this.state = {
      editingPowerIndex: -1,
    }
  }

  handleCheckboxChange = (index: number) => {
    const updatedPower = this.props.powers[index];
    updatedPower.checked = !updatedPower.checked;
    this.props.updatePower(index, updatedPower);
  };

  saveEditingPower = () => {
    const updatedPower = this.props.powers[this.state.editingPowerIndex];
    if(this.state.editingPowerValue !== undefined) updatedPower.value = this.state.editingPowerValue;
    if(this.state.editingPowerName !== undefined) updatedPower.name = this.state.editingPowerName;
    if(this.state.editingPowerCost !== undefined) updatedPower.cost = this.state.editingPowerCost;
    if(this.state.editingPowerIntensity !== undefined) updatedPower.intensity = this.state.editingPowerIntensity;
    if(this.state.editingPowerDescription !== undefined) updatedPower.description = this.state.editingPowerDescription;
    this.props.updatePower(this.state.editingPowerIndex, updatedPower);
    this.discardEdits();
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
    this.setState({editingPowerIndex: -1, editingPowerName: undefined, editingPowerValue: undefined, editingPowerCost: undefined, editingPowerIntensity: undefined, editingPowerDescription: undefined });
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
          if((this.props.tag && power.tags.indexOf(this.props.tag) < 0) || (!this.props.tag && power.tags.length != 0)) return <Fragment key={index}></Fragment>;
          else return (
            <Fragment key={index}>
            <div className="PowerItem">
              <div onClick={() => {this.setState({ editingPowerIndex: index, editingPowerName: powers[index].name})}} className={"PowerName"}>
                {this.state.editingPowerIndex === index && this.state.editingPowerName !== undefined ? 
                  (
                    <div className={""}>
                      <UnfocusHandler
                        handleUnfocus={this.saveEditingPower}
                      >
                        <input 
                          autoFocus 
                          className="TransparentInput InputLeft"
                          value={this.state.editingPowerName} 
                          onChange={(e) => {this.setState({editingPowerName: e.target.value})}}
                          onKeyDown={this.handleKeyDown}>
                        </input>
                      </UnfocusHandler>
                    </div>
                  )
                  :
                  (
                    <span>{powers[index].name}</span>
                  )
                }
                
               </div>


               {this.state.editingPowerIndex === index && this.state.editingPowerIntensity !== undefined ? 
                (
                  <div className={"SkillValueEdit"}>
                    <UnfocusHandler
                      handleUnfocus={this.saveEditingPower}
                    >
                      <input 
                        autoFocus 
                        className="TransparentInput InputLeft"
                        value={this.state.editingPowerIntensity} 
                        onChange={(e) => {this.setState({editingPowerIntensity: e.target.value})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </UnfocusHandler>
                  </div>
                )
                :
                (
                  <div className={"PowerName"} onClick={() => {this.setState({ editingPowerIndex: index, editingPowerIntensity: powers[index].intensity })}}>
                    <b>{powers[index].intensity}</b>
                  </div>
                )
               }
               
               {this.state.editingPowerIndex === index && this.state.editingPowerCost !== undefined ? 
                (
                  <div className={"SkillValueEdit"}>
                    <UnfocusHandler
                      handleUnfocus={this.saveEditingPower}
                    >
                      <input 
                        autoFocus 
                        className="TransparentInput InputLeft"
                        value={this.state.editingPowerCost} 
                        onChange={(e) => {this.setState({editingPowerCost: parseInt(e.target.value)})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </UnfocusHandler>
                  </div>
                )
                :
                (
                  <div className={"SkillValue"} onClick={() => {this.setState({ editingPowerIndex: index, editingPowerCost: powers[index].cost })}}>
                    <b>{powers[index].cost}pp</b>
                  </div>
                )
               }

               {this.state.editingPowerIndex === index && this.state.editingPowerValue !== undefined ? 
                (
                  <div className={"PowerValueEdit"}>
                    <UnfocusHandler
                      handleUnfocus={this.saveEditingPower}
                    >
                      <input 
                        autoFocus 
                        className="TransparentInput InputLeft"
                        value={this.state.editingPowerValue} 
                        onChange={(e) => {this.setState({editingPowerValue: parseInt(e.target.value)})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </UnfocusHandler>
                  </div>
                )
                :
                (
                  <div onClick={() => {this.setState({ editingPowerIndex: index, editingPowerValue: powers[index].value })}} className={"PowerValue"}>
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
            <div className="PowerDescription">
              {this.state.editingPowerIndex === index && this.state.editingPowerDescription !== undefined ? 
                  (
                    <div className={"PowerDescriptionEdit"}>
                      <UnfocusHandler
                        handleUnfocus={this.saveEditingPower}
                      >
                        <input 
                          autoFocus 
                          className="TransparentInput InputLeft"
                          value={this.state.editingPowerDescription} 
                          onChange={(e) => {this.setState({editingPowerDescription: e.target.value})}}
                          onKeyDown={this.handleKeyDown}>
                        </input>
                      </UnfocusHandler>
                    </div>
                  )
                  :
                  (
                    <div className={"PowerName"} onClick={() => {this.setState({ editingPowerIndex: index, editingPowerDescription: powers[index].description })}}>
                      <span>{powers[index].description || "no description"}</span>
                    </div>
                  )
                }
            </div>
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default PowerBlock;
