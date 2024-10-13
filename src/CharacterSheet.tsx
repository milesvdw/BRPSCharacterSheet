import React, { Component } from 'react';
import CharacterSheetContext, { CharacterSheetData } from './CharacterSheetContext';

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
    this.state = {
      characterSheet: null,
    };
  }

  // Once the component mounts, we set the context into the state
  componentDidMount() {
    const characterSheet = this.context;
    if (characterSheet) {
      this.setState({ characterSheet });
    }
  }

  render() {
    const { characterSheet } = this.state;

    // If the character sheet data is not available, show a loading message
    if (!characterSheet) {
      return <p>Loading character sheet data...</p>;
    }

    return (
      <div>
        <h1>Character Sheet</h1>
        <pre>
          <code>{JSON.stringify(characterSheet, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default CharacterSheet;
