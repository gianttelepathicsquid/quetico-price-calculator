import React from 'react';
import PriceCalculator from './components/PriceCalculator';

function App() {
  return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <PriceCalculator />
    </div>
  );
}

export default App;
