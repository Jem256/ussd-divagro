import React from 'react';
import PrimaryButton, {SecondaryButton, TertiaryButton} from './components/Button';
import { GlobalStyle } from './utils';

function App() {
  return (
    <div>
      <PrimaryButton modifiers={["small", "success", "primaryButtonSuccess"]}>Hello World!</PrimaryButton>
      <SecondaryButton modifiers={["large", "warning", "secondaryButtonWarning"]}>Goodbye World!</SecondaryButton>
      <TertiaryButton modifiers={["error", "tertiaryButtonError"]}>Hey World!</TertiaryButton>
      <GlobalStyle />
    </div>
  );
}

export default App;