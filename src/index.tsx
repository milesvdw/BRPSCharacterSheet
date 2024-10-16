import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterSheetProvider } from './CharacterDataProvider';
import CharacterSheet from './CharacterSheet';

const App: React.FC = () => 
(<CharacterSheetProvider>
    <CharacterSheet />
</CharacterSheetProvider>);
{/* <div>Hello world</div>; */}

ReactDOM.render(<App />, document.getElementById('root'));
