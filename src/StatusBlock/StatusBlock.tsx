import React, { Component } from 'react';
import './StatusBlock.css';
import { Status } from '../DefaultCharacterSheets';
import HrFlourish from '../HrFlourish/HrFlourish';
import UnfocusHandler from '../UnfocusHandler/UnfocusHandler';

interface BaseStatsProps {
    status: Status,
    stats: any,
    derived: any
    updateStatus: (status: Status) => void
}

interface BaseStatsState {
  editingHpValue?: number;
  editingPowerValue?: number;
  editingWoundValue?: string
  editingLuckValue?: number
}

class BaseStats extends Component<BaseStatsProps, BaseStatsState> {
  constructor(props: BaseStatsProps) {
    super(props);

    this.state = {

    }
  }

  saveEditingStatus = () => {
    const updatedStatus = this.props.status;
    if(this.state.editingHpValue !== undefined) updatedStatus.hp = this.state.editingHpValue;
    if(this.state.editingPowerValue !== undefined) updatedStatus.power = this.state.editingPowerValue;
    if(this.state.editingWoundValue !== undefined) updatedStatus.wounds = this.state.editingWoundValue;
    if(this.state.editingLuckValue !== undefined) updatedStatus.luck = this.state.editingLuckValue;
    this.props.updateStatus(updatedStatus);
    this.discardEdits();
  }

  
  discardEdits = () => {
    this.setState({editingHpValue: undefined, editingPowerValue: undefined, editingWoundValue: undefined, editingLuckValue: undefined})
  }
  
  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveEditingStatus();
    }
    if (event.key === 'Escape') {
      this.discardEdits();
    }
  };

  beginEditPower = (event: any) => {
    this.setState({editingPowerValue: this.props.status.power})
  }

  beginEditHp = (event: any) => {
    this.setState({editingHpValue: this.props.status.hp})
  }

  beginEditWounds = (event: any) => {
    this.setState({editingWoundValue: this.props.status.wounds})
  }

  beginEditLuck = (event: any) => {
    this.setState({editingLuckValue: this.props.status.luck})
  }


  render() {
    const maxhp = this.props.derived.maxHp;
    const curHp = this.props.status.hp;
    return (
      <div className={"StatusBlock"}>
        <div className="HealthHeader">
          <strong>Health:</strong> 
          <span  className="StatusValue">{this.state.editingHpValue !== undefined ? 
            <UnfocusHandler
              handleUnfocus={this.saveEditingStatus}
            >
              <input 
                autoFocus
                className="TransparentInput"
                value={this.state.editingHpValue}
                onChange={(e) => {this.setState({editingHpValue: parseInt(e.target.value)})}}
                onKeyDown={this.handleKeyDown}
              />
            </UnfocusHandler> :
            <strong 
              onClick={this.beginEditHp}>{curHp}
            </strong>} / {<strong>{maxhp}</strong>}
          </span>
        </div>
        <div className="HealthBar fantasy-border">
          <div className={`Health ${curHp === maxhp ? "Full" : ""}`} style={{width: `${curHp * 100 / maxhp}%`}}></div>
          <div className="Damage" style={{width: `${100 - (curHp * 100 / maxhp)}%`}}></div>
        </div>
        <div className="HealthHeader">
          <strong>Power:</strong>
          <span  className="StatusValue">{this.state.editingPowerValue !== undefined ?
            <UnfocusHandler
              handleUnfocus={this.saveEditingStatus}
            >
              <input
                autoFocus
                className="TransparentInput"
                value={this.state.editingPowerValue}
                onChange={(e) => {this.setState({editingPowerValue: parseInt(e.target.value)})}}
                onKeyDown={this.handleKeyDown}
              />
            </UnfocusHandler> :
              <strong
                onClick={this.beginEditPower}>{this.props.status.power}
                </strong>} / {<strong>{this.props.stats.pow}</strong>}
          </span>
        </div>
        <div className="PowerBar fantasy-border">
          <div className={`Power ${this.props.status.power === this.props.stats.pow ? "Full" : ""}`} style={{width: `${this.props.status.power * 100 / this.props.stats.pow}%`}}></div>
          <div className="Spent" style={{width: `${100 - (this.props.status.power * 100 / this.props.stats.pow)}%`}}></div>
        </div>
        <div className="HealthHeader">
          <strong>Luck:</strong>
          <span className="StatusValue">{this.state.editingLuckValue !== undefined ?
            <UnfocusHandler
              handleUnfocus={this.saveEditingStatus}
            >
              <input
                autoFocus
                className="TransparentInput"
                value={this.state.editingLuckValue}
                onChange={(e) => {this.setState({editingLuckValue: parseInt(e.target.value)})}}
                onKeyDown={this.handleKeyDown}
              />
            </UnfocusHandler>
             :
              <strong
                onClick={this.beginEditLuck}>{this.props.status.luck}
                </strong>} / {<strong>100</strong>}
          </span>
        </div>
        
        <b>
          Wounds:
        </b>
        <div 
          className="Wounds"
          onClick={this.beginEditWounds}
        >
          {this.state.editingWoundValue !== undefined ? 
            <UnfocusHandler
              handleUnfocus={this.saveEditingStatus}
            >
              <textarea 
              autoFocus
              className="WoundsEdit TransparentInput"
              spellCheck="false"
              onChange={(e) => {this.setState({editingWoundValue: e.target.value})}}
              >{this.state.editingWoundValue}</textarea>
            </UnfocusHandler>
            :
            <span>{this.props.status.wounds}</span>
          }
        </div>
      </div>
    );
  }
}

export default BaseStats;
