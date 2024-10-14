import React, { Component } from 'react';
import './PowerBlock.css';
import { Power } from '../DefaultCharacterSheets';


interface PowerBlockProps {
  tag: string;
  powers: Power[];
}

interface PowerBlockState {
  powers: { [key: number]: boolean };
}

class PowerBlock extends Component<PowerBlockProps, PowerBlockState> {
  constructor(props: PowerBlockProps) {
    super(props);
  }

  handleCheckboxChange = (index: number) => {
    
  };

  render() {
    const { powers } = this.props;

    return (
      <div className="Container">
        {powers.map((power, index) => {
          return (
            <div key={index} className="PowerItem">
              <div className={"PowerName"}>
                 <span>{powers[index].name}</span>
              </div>
              <div className={"PowerIntensity"}>
                  <span>{powers[index].intensity}</span>
               </div>
               <div className={"PowerValue"}>
                 <span><b>{powers[index].value}</b>/{Math.floor(powers[index].value/2)}/{Math.floor(powers[index].value/5)}%</span>
               </div>
               <div className={"Checkbox"}>
                  <input
                      type="checkbox"
                      checked={powers[index].checked || false}
                      onChange={() => this.handleCheckboxChange(index)}
                    />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PowerBlock;
