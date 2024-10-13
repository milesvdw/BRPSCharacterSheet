import React from "react";

// Define the shape of the character sheet data
export interface CharacterSheetData {
  name: string;
  level: number;
  class: string;
}

// Create the context with default undefined
const CharacterSheetContext = React.createContext<CharacterSheetData | undefined>(undefined);

export default CharacterSheetContext;
