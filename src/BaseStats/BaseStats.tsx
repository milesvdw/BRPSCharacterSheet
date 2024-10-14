import React, { Component } from 'react';
import './BaseStats.css';

interface BaseStatsProps {
    stats: any
}

interface BaseStatsState {
}

class BaseStats extends Component<BaseStatsProps, BaseStatsState> {
  constructor(props: BaseStatsProps) {
    super(props);
  }


  render() {
    return (
    <div className={"BaseStats"}>
        <h2>Character Stats</h2>
        <div className={"StatBlock"}>
          <div className="StatItem">
            <strong>Strength:</strong> <span>{this.props.stats.str}</span> <span><b>{(this.props.stats.str*5)}</b> / {Math.floor((this.props.stats.str*5)/2)} / {Math.floor((this.props.stats.str*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Constitution:</strong> <span>{this.props.stats.con}</span> <span><b>{(this.props.stats.con*5)}</b> / {Math.floor((this.props.stats.con*5)/2)} / {Math.floor((this.props.stats.con*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Size:</strong> <span>{this.props.stats.siz}</span> <span><b>{(this.props.stats.siz*5)}</b> / {Math.floor((this.props.stats.siz*5)/2)} / {Math.floor((this.props.stats.siz*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Intelligence:</strong> <span>{this.props.stats.int}</span> <span><b>{(this.props.stats.int*5)}</b> / {Math.floor((this.props.stats.int*5)/2)} / {Math.floor((this.props.stats.int*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Power:</strong> <span>{this.props.stats.pow}</span> <span><b>{(this.props.stats.pow*5)}</b> / {Math.floor((this.props.stats.pow*5)/2)} / {Math.floor((this.props.stats.pow*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Dexterity:</strong> <span>{this.props.stats.dex}</span> <span><b>{(this.props.stats.dex*5)}</b> / {Math.floor((this.props.stats.dex*5)/2)} / {Math.floor((this.props.stats.dex*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Charisma:</strong> <span>{this.props.stats.cha}</span> <span><b>{(this.props.stats.cha*5)}</b> / {Math.floor((this.props.stats.cha*5)/2)} / {Math.floor((this.props.stats.cha*5)/5)}%</span>
          </div>
          <div className="StatItem">
            <strong>Education:</strong> <span>{this.props.stats.edu}</span> <span><b>{(this.props.stats.edu*5)}</b> / {Math.floor((this.props.stats.edu*5)/2)} / {Math.floor((this.props.stats.edu*5)/5)}%</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BaseStats;
