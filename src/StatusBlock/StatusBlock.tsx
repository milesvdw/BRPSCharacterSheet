import React, { Component } from 'react';
import './StatusBlock.css';
import { Status } from '../DefaultCharacterSheets';

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
}

class BaseStats extends Component<BaseStatsProps, BaseStatsState> {
  constructor(props: BaseStatsProps) {
    super(props);
    this.state = {
      editingHp: false,
      editingPower: false,
      editingHpValue: this.props.status.hp,
      editingPowerValue: this.props.status.power
    }
  }

  saveEditingSkill = () => {
    const updatedStatus = this.props.status;
    updatedStatus.hp = this.state.editingHpValue;
    updatedStatus.power = this.state.editingPowerValue;
    this.props.updateStatus(updatedStatus);
    this.setState({editingHp: false, editingPower: false})
  }

  
  discardEdits = () => {
    this.setState({editingHp: false, editingPower: false})
  }
  
  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveEditingSkill();
    }
    if (event.key === 'Escape') {
      this.discardEdits();
    }
  };


  render() {
    const maxhp = this.props.derived.maxHp;
    const curHp = this.props.status.hp;
    return (
      <div className={"StatusBlock"}>
        <div className="HealthHeader">
          <strong>Health:</strong> 
          <span>{this.state.editingHp ? 
            <input 
              value={this.state.editingHpValue}
              onChange={(e) => {this.setState({editingHpValue: parseInt(e.target.value)})}}
              onKeyDown={this.handleKeyDown}
            /> :
            <strong 
              onClick={() => {this.setState({editingHp: true, editingHpValue: this.props.status.hp})}}>{curHp}
            </strong>} / {<strong>{maxhp}</strong>}
          </span>
        </div>
        <div className="HealthBar fantasy-border">
          <div className="Health" style={{width: `${curHp * 100 / maxhp}%`}}></div>
          <div className="Damage" style={{width: `${100 - (curHp * 100 / maxhp)}%`}}></div>
        </div>
        <div>
          Wounds 
          <input
            type="checkbox"
            checked={false}
          />
        </div>
        <div className="HealthHeader">
          <strong>Power:</strong>
          <span>{this.state.editingPower ?
            <input
              value={this.state.editingPowerValue}
              onChange={(e) => {this.setState({editingPowerValue: parseInt(e.target.value)})}}
              onKeyDown={this.handleKeyDown}
            /> :
              <strong
                onClick={() => {this.setState({editingPower: true, editingPowerValue: this.props.status.power})}}>{this.props.status.power}
                </strong>} / {<strong>{this.props.stats.pow}</strong>}
          </span>
        </div>
        <div className="PowerBar fantasy-border">
          <div className="Power" style={{width: `${this.props.status.power * 100 / maxhp}%`}}></div>
          <div className="Spent" style={{width: `${100 - (this.props.status.power * 100 / this.props.stats.pow)}%`}}></div>
        </div>
      </div>
    );
  }
}

export default BaseStats;
