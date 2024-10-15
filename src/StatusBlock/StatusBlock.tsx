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
  editingHp: boolean;
  editingHpValue: number;
  editingPower: boolean;
  editingPowerValue: number;
  editingWounds: boolean;
  editingWoundValue: string
}

class BaseStats extends Component<BaseStatsProps, BaseStatsState> {
  constructor(props: BaseStatsProps) {
    super(props);
    this.state = {
      editingHp: false,
      editingPower: false,
      editingWounds: false,
      editingWoundValue: this.props.status.wounds,
      editingHpValue: this.props.status.hp,
      editingPowerValue: this.props.status.power
    }
  }

  saveEditingStatus = () => {
    const updatedStatus = this.props.status;
    updatedStatus.hp = this.state.editingHpValue;
    updatedStatus.power = this.state.editingPowerValue;
    updatedStatus.wounds = this.state.editingWoundValue;
    this.props.updateStatus(updatedStatus);
    this.discardEdits();
  }

  
  discardEdits = () => {
    this.setState({editingHp: false, editingPower: false, editingWounds: false, editingHpValue: this.props.status.hp, editingPowerValue: this.props.status.power, editingWoundValue: this.props.status.wounds})
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
    this.setState({editingPower: true, editingHp: false, editingWounds: false})
  }

  beginEditHp = (event: any) => {
    this.setState({editingHp: true, editingPower: false, editingWounds: false})
  }

  beginEditWounds = (event: any) => {
    this.setState({editingHp: false, editingPower: false, editingWounds: true})
  }


  render() {
    const maxhp = this.props.derived.maxHp;
    const curHp = this.props.status.hp;
    return (
      <div className={"StatusBlock"}>
        <div className="HealthHeader">
          <strong>Health:</strong> 
          <span>{this.state.editingHp ? 
            <input 
              autoFocus
              className="TransparentInput"
              value={this.state.editingHpValue}
              onChange={(e) => {this.setState({editingHpValue: parseInt(e.target.value)})}}
              onKeyDown={this.handleKeyDown}
            /> :
            <strong 
              onClick={this.beginEditHp}>{curHp}
            </strong>} / {<strong>{maxhp}</strong>}
          </span>
        </div>
        <div className="HealthBar fantasy-border">
          <div className="Health" style={{width: `${curHp * 100 / maxhp}%`}}></div>
          <div className="Damage" style={{width: `${100 - (curHp * 100 / maxhp)}%`}}></div>
        </div>
        <div className="HealthHeader">
          <strong>Power:</strong>
          <span>{this.state.editingPower ?
            <input
              autoFocus
              className="TransparentInput"
              value={this.state.editingPowerValue}
              onChange={(e) => {this.setState({editingPowerValue: parseInt(e.target.value)})}}
              onKeyDown={this.handleKeyDown}
            /> :
              <strong
                onClick={this.beginEditPower}>{this.props.status.power}
                </strong>} / {<strong>{this.props.stats.pow}</strong>}
          </span>
        </div>
        <div className="PowerBar fantasy-border">
          <div className="Power" style={{width: `${this.props.status.power * 100 / maxhp}%`}}></div>
          <div className="Spent" style={{width: `${100 - (this.props.status.power * 100 / this.props.stats.pow)}%`}}></div>
        </div>
        
        <b>
          Wounds:
        </b>
        <div 
          className="Wounds"
          onClick={this.beginEditWounds}
        >
          {this.state.editingWounds ? 
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
