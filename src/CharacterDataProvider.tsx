import React, { Component } from "react";
import CharacterSheetContext, { CharacterSheetData } from "./CharacterSheetContext";
import { defaultMagicWorld } from "./DefaultCharacterSheets";

// Define types for props and state
interface CharacterSheetProviderProps {
  children: any
}
interface CharacterSheetProviderState {
  CharacterSheetData: CharacterSheetData;
}

export class CharacterSheetProvider extends Component<
  CharacterSheetProviderProps,
  CharacterSheetProviderState
> {
  constructor(props: CharacterSheetProviderProps) {
    super(props);

    // Initialize state
    this.state = {
      CharacterSheetData: defaultMagicWorld,
    };
  }

  componentDidMount() {
    this.loadcharacterData();
  }

  loadcharacterData() {
    // Check for data in local storage (can be replaced by cookie if needed)
    const data = localStorage.getItem("character_sheet_data.json");

    if (data) {
      try {
        const parsedData: CharacterSheetData = JSON.parse(data);
        this.setState({ CharacterSheetData: parsedData });
      } catch (error) {
        console.error("Error parsing character sheet data:", error);
      }
    }
  }

  render() {
    const { CharacterSheetData } = this.state;

    return (
      <CharacterSheetContext.Provider value={{ value: this.state.CharacterSheetData, updateValue: (newValue: CharacterSheetData) => {this.setState({ CharacterSheetData: {...newValue}})}}}>
        {this.props.children}
      </CharacterSheetContext.Provider>
    );
  }
}

export default CharacterSheetProvider;
