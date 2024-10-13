import React, { Component } from "react";
import CharacterSheetContext, { CharacterSheetData } from "./CharacterSheetContext";

// Define types for props and state
interface CharacterSheetProviderProps {
  children: any
}
interface CharacterSheetProviderState {
  CharacterSheetData?: CharacterSheetData;
}

export class CharacterSheetProvider extends Component<
  CharacterSheetProviderProps,
  CharacterSheetProviderState
> {
  // Singleton instance
  private static instance: CharacterSheetProvider | null = null;

  constructor(props: CharacterSheetProviderProps) {
    super(props);

    // Initialize state
    this.state = {
      CharacterSheetData: undefined,
    };

    // Ensure singleton
    if (!CharacterSheetProvider.instance) {
      CharacterSheetProvider.instance = this;
    }

    return CharacterSheetProvider.instance;
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
        alert("Failed to load character sheet data.");
      }
    } else {
      alert("Character sheet data not found.");
    }
  }

  render() {
    const { CharacterSheetData } = this.state;

    return (
      <CharacterSheetContext.Provider value={CharacterSheetData}>
        {this.props.children}
      </CharacterSheetContext.Provider>
    );
  }
}

export default CharacterSheetProvider;
