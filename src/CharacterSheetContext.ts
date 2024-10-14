import React from "react";
import { defaultMagicWorld } from "./DefaultCharacterSheets";

// Define the shape of the character sheet data
export type CharacterSheetData = typeof defaultMagicWorld

// Create the context with default undefined
const CharacterSheetContext = React.createContext<{
    value: CharacterSheetData
    updateValue: (newValue: typeof defaultMagicWorld) => void
} | undefined>(undefined);

export default CharacterSheetContext;
