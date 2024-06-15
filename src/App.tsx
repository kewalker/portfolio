import React, { useState } from 'react';
import { CssBaseline, Container, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from './logo.svg';  // Assuming you have a logo file
import ButtonBar from './components/ButtonBar'; // Import the ButtonBar component
import SelectableCards from './components/SelectableCard';
import './App.css';
import TemperatureConverter from './components/TemperatureConverter';
import WeightConverter from './components/WeightConverter';

interface CardData {
  title: string;
  description: string;
  content: React.ReactNode;
}

const theme = createTheme();

const cardData: CardData[] = [
  { title: 'Temperature Converter', description: 'Convert between Celsius and Fahrenheit.', content: <TemperatureConverter /> },
  { title: 'Weight Converter', description: 'Convert between Kilograms and Pounds.', content: <WeightConverter /> },
];

const App: React.FC = () => {

  const [currentPage, setCurrentPage] = useState('Home');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <ButtonBar currentPage={currentPage} onPageChange={handlePageChange} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Under construction...</p>

          {/* Render currentPage as an HTML component */}
          {currentPage === 'Home' && <SelectableCards cards={cardData} />}
          {currentPage === 'About' && <h1>About Component</h1>}
          {currentPage === 'Contact' && <h1>Contact Component</h1>}

        </header>
      </ThemeProvider>
    </div>
  );
};

export default App;
