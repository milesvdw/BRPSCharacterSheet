import React, { Component } from 'react';
import CharacterSheetContext, { CharacterSheetData } from './CharacterSheetContext';
import SkillBlock from './SkillBlock/SkillBlock';
import './CharacterSheet.css'
import { InventoryItem, Skill } from './DefaultCharacterSheets';
import Collapsible from './Collapsible/Collapsible';
import Inventory from './Inventory/Inventory';

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

  updateItem = (index: number, item: InventoryItem) => {
    const oldContext = this.context?.value!;
    oldContext.inventory[index] = item;
    this.context?.updateValue(oldContext);
  }

  deleteItem = (index: number) => {
    const oldContext = this.context?.value!;
    oldContext.inventory.splice(index, 1);
    this.context?.updateValue(oldContext);
  }

  deleteSkill = (index: number) => {
    const oldContext = this.context?.value!;
    oldContext.skills.splice(index, 1);
    this.context?.updateValue(oldContext);
  }

  render() {

    return (
      <div>
        <h1>{this.context?.value.personal.name} : {this.context?.value.personal.player}</h1>

        <Collapsible title="Inventory" open={false}>
          <Inventory
            deleteItem={this.deleteItem}
            updateItem={this.updateItem}
            items={this.context?.value.inventory!} />
        </Collapsible>
        <Collapsible title="Skills">
          <div className="SkillsTable">
            <div className="SkillBlocks">
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="language"
                skills={this.context?.value.skills!} />
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="science"
                skills={this.context?.value.skills!} />
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="knowledge"
                skills={this.context?.value.skills!} />
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="craft"
                skills={this.context?.value.skills!} />
            </div>
            <div className="SkillBlocks">
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="combat"
                skills={this.context?.value.skills!} />
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="weapon"
                skills={this.context?.value.skills!} />
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                tag="flaw"
                skills={this.context?.value.skills!} />
            </div>
            <div className="SkillBlocks">
              <SkillBlock
                deleteSkill={this.deleteSkill}
                updateSkill={this.updateSkill}
                skills={this.context?.value.skills!} />
            </div>
          </div>
        </Collapsible>
        
      </div>
    );
  }
}

export default CharacterSheet;
