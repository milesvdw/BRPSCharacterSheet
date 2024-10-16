import React, { Component } from 'react';
import CharacterSheetContext, { CharacterSheetData } from './CharacterSheetContext';
import SkillBlock from './SkillBlock/SkillBlock';
import './CharacterSheet.css'
import { InventoryItem, Power, Skill, Status } from './DefaultCharacterSheets';
import Collapsible from './Collapsible/Collapsible';
import Inventory from './Inventory/Inventory';
import PowerBlock from './PowerBlock/PowerBlock';
import Save from './Icons/Save';
import IconButton from './IconButton/IconButton';
import Upload from './Icons/Upload';
import Download from './Icons/Download';
import BaseStats from './BaseStats/BaseStats';
import StatusBlock from './StatusBlock/StatusBlock';

// Define the state interface for the component
interface CharacterSheetState {
  characterSheet: CharacterSheetData | null;
  uploading?: boolean;
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

  updatePower = (index: number, power: Power) => {
    const oldContext = this.context?.value!;
    oldContext.powers[index] = power;
    this.context?.updateValue(oldContext);
  }

  updateStatus = (status: Status) => {
    const oldContext = this.context?.value!;
    oldContext.currentStatus = status;
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

  deletePower = (index: number) => {
    const oldContext = this.context?.value!;
    oldContext.powers.splice(index, 1);
    this.context?.updateValue(oldContext);
  }

  promptUpload = () => {
    this.setState({uploading: true})
  }

  uploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file uploaded

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        const json = JSON.parse(content as string);
        this.context?.updateValue(json);
      };
      reader.readAsText(file);
    }
  }

  downloadJson = () => {
    const jsonString = JSON.stringify(this.context?.value, null, 2);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a link element
    const link = document.createElement('a');
    
    // Create an object URL for the Blob and set it as the href of the link
    link.href = URL.createObjectURL(blob);
    
    // Set the download attribute to specify the filename
    link.download = this.context?.value.personal.name + "_sheet.json";
    
    // Append the link to the document body
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the document after the download starts
    document.body.removeChild(link);
  }

  render() {

    return (
      <div>
        <div id="parchment"></div>
        <svg style={{height: 0}}>
          <filter id="wavy2">
            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </svg>
        <div id="contain">
          <h1 className={"CharacterHeader"}>
            <span>{this.context?.value.personal.name} : {this.context?.value.personal.player}</span>
            <span className="UploadDownload">
              {this.state?.uploading && <input type="file" accept=".json" onChange={this.uploadJson} />}
              <IconButton onClick={() => {this.promptUpload()}}><Upload /></IconButton>
              <IconButton onClick={() => {this.downloadJson()}}><Download /></IconButton></span>
          </h1>

          <Collapsible title="Stats">
            <div className="SkillsTable">
              <div className="StatBlock">
                <BaseStats
                  stats={this.context?.value.characteristics.base!} />
              </div>
              <div className="StatBlock">
                <StatusBlock
                  updateStatus={this.updateStatus}
                  status={this.context?.value.currentStatus!}
                  stats={this.context?.value.characteristics.base!}
                  derived={this.context?.value.characteristics.derived!} />
              </div>
            </div>
          </Collapsible>
          <Collapsible title="Powers">
            <div className="SkillsTable">
              <div className="SkillBlocks">
                <PowerBlock
                  power={this.context?.value.currentStatus.power!}
                  deletePower={this.deletePower}
                  updatePower={this.updatePower}
                  tag={"somaturgy"}
                  powers={this.context?.value.powers!} />
              </div>
              <div className="SkillBlocks">
                <PowerBlock
                  power={this.context?.value.currentStatus.power!}
                  deletePower={this.deletePower}
                  updatePower={this.updatePower}
                  tag={"pyromancy"}
                  powers={this.context?.value.powers!} />
              </div>
            </div>
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
                <SkillBlock
                  deleteSkill={this.deleteSkill}
                  updateSkill={this.updateSkill}
                  tag="perception"
                  skills={this.context?.value.skills!} />
              </div>
              <div className="SkillBlocks">
                <SkillBlock
                  deleteSkill={this.deleteSkill}
                  updateSkill={this.updateSkill}
                  tag="social"
                  skills={this.context?.value.skills!} />
                <SkillBlock
                  deleteSkill={this.deleteSkill}
                  updateSkill={this.updateSkill}
                  skills={this.context?.value.skills!} />
              </div>
            </div>
          </Collapsible>
          <Collapsible title="Inventory" open={false}>
            <Inventory
              deleteItem={this.deleteItem}
              updateItem={this.updateItem}
              items={this.context?.value.inventory!} />
          </Collapsible>

        </div>
        
        
      </div>
    );
  }
}

export default CharacterSheet;
