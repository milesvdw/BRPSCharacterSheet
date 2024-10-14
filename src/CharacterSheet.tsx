import React, { Component } from 'react';
import CharacterSheetContext, { CharacterSheetData } from './CharacterSheetContext';
import SkillBlock from './SkillBlock/SkillBlock';
import './CharacterSheet.css'
import { Skill } from './DefaultCharacterSheets';

// Define the state interface for the component
interface CharacterSheetState {
  characterSheet: CharacterSheetData | null;
}

class CharacterSheet extends Component<{}, CharacterSheetState> {
  // Attach the context to the class component using `contextType`
  static contextType = CharacterSheetContext;
  context!: React.ContextType<typeof CharacterSheetContext>;

  constructor(props: {}) {
    super(props);
  }

  updateSkill = (index: number, skill: Skill) => {
    const oldContext = this.context?.value!;
    oldContext.skills[index] = skill;
    this.context?.updateValue(oldContext);
  }

  render() {

    return (
      <div>
        <h1>{this.context?.value.personal.name} : {this.context?.value.personal.player}</h1>
        <div className="SkillsTable">
          <div className="SkillBlocks">
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="language"
              skills={this.context?.value.skills!} />
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="science"
              skills={this.context?.value.skills!} />
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="knowledge"
              skills={this.context?.value.skills!} />
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="craft"
              skills={this.context?.value.skills!} />
          </div>
          <div className="SkillBlocks">
            <SkillBlock
                updateSkill={this.updateSkill}
                tag="combat"
                skills={this.context?.value.skills!} />
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="weapon"
              skills={this.context?.value.skills!} />
            <SkillBlock
              updateSkill={this.updateSkill}
              tag="flaw"
              skills={this.context?.value.skills!} />
          </div>
          <div className="SkillBlocks">
            <SkillBlock
                updateSkill={this.updateSkill}
                skills={this.context?.value.skills!} />
          </div>
        </div>
        
      </div>
    );
  }
}

export default CharacterSheet;
