import React, { Component } from 'react';
import './SkillBlock.css';
import { Skill } from '../DefaultCharacterSheets';
import Plus from '../Icons/Plus';
import IconButton from '../IconButton/IconButton';
import Save from '../Icons/Save';


interface SkillBlockProps {
  tag?: string;
  skills: Skill[];
  updateSkill: (index: number, skill: Skill) => void;
  deleteSkill: (index: number) => void;
}

interface SkillBlockState {
  editingSkillIndex: number;
  editingSkillValue: number;
  editingSkillName: string;
}

class SkillBlock extends Component<SkillBlockProps, SkillBlockState> {
  constructor(props: SkillBlockProps) {
    super(props);

    this.state = {
      editingSkillName: "",
      editingSkillIndex: -1,
      editingSkillValue: 0
    }
  }

  handleCheckboxChange = (index: number) => {
    const updatedSkill = this.props.skills[this.state.editingSkillIndex];
    updatedSkill.checked = !updatedSkill.checked;
    this.props.updateSkill(index, updatedSkill);
  };

  saveEditingSkill = () => {
    const updatedSkill = this.props.skills[this.state.editingSkillIndex];
    updatedSkill.value = this.state.editingSkillValue;
    updatedSkill.name = this.state.editingSkillName;
    this.props.updateSkill(this.state.editingSkillIndex, updatedSkill);
    this.setState({editingSkillIndex: -1})
  }

  generateNewSkill = (tags: string[]) => {
    return {
      name: "",
      value: 0,
      checked: false,
      tags: tags
    }
  }

  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveEditingSkill();
    }
    if (event.key === 'Escape') {
      this.discardEdits();
    }
  };

  discardEdits = () => {
    this.setState({editingSkillIndex: -1});
  }

  createNewSkill = () => {
    this.props.updateSkill(this.props.skills.length, this.generateNewSkill(this.props.tag ? [this.props.tag] : []));
  }

  render() {
    const { skills } = this.props;

    return (
      <div className="Container">
        <div className="SkillCategoryHeader">
          <h2 className="SkillCategoryTitle">{this.props.tag}</h2>
          <IconButton onClick={this.createNewSkill}><Plus /></IconButton>
        </div>
        {skills.map((skill, index) => {
          if((this.props.tag && skill.tags.indexOf(this.props.tag) < 0) || (!this.props.tag && skill.tags.length != 0)) return <></>;
          else return (
            <div key={index} className="SkillItem"
              onClick={() => {this.setState({ editingSkillIndex: index, editingSkillValue: skills[index].value, editingSkillName: skills[index].name})}}
            >
              <div className={"SkillName"}>
                {this.state.editingSkillIndex === index ? 
                  (
                    <div className={"SkillValueEdit"}>
                      <input autoFocus 
                        value={this.state.editingSkillName} 
                        onChange={(e) => {this.setState({editingSkillName: e.target.value})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </div>
                  )
                  :
                  (
                    <span>{skills[index].name}</span>
                  )
                }
                
               </div>
               
               {this.state.editingSkillIndex === index ? 
                (
                  <div className={"SkillValueEdit"}>
                    <input autoFocus 
                      value={this.state.editingSkillValue} 
                      onChange={(e) => {this.setState({editingSkillValue: parseInt(e.target.value)})}}
                      onKeyDown={this.handleKeyDown}>
                    </input>
                  </div>
                )
                :
                (
                  <div className={"SkillValue"}>
                    <span><b>{skills[index].value}</b>/{Math.floor(skills[index].value/2)}/{Math.floor(skills[index].value/5)}%</span>
                  </div>
                )
               }
               


              {this.state.editingSkillIndex === index ?
                (
                  <IconButton onClick={(event: any) => {this.saveEditingSkill(); event?.stopPropagation();}}><Save /></IconButton>
                )
                :
                (
                  <div className={"Checkbox"}>
                      <input
                          type="checkbox"
                          checked={skills[index].checked || false}
                          onChange={() => this.handleCheckboxChange(index)}
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

export default SkillBlock;
