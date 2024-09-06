import { Box, Paper, Button } from "@mui/material";
import { FC, useState, useEffect } from "react";

const M: number = 15; // Number of rows
const N: number = 15; // Number of columns

// Generates a random first row with 0s and 1s
const generateInitialGrid = (): (0 | 1)[][] => {
  const initialRow = Array.from({ length: N }, () => (Math.random() > 0.5 ? 1 : 0));
  return [initialRow, ...Array.from({ length: M - 1 }, () => Array(N).fill(0))];
};

// Rule 30 logic for determining the next state of a cell
const applyRule30 = (left: 0 | 1, center: 0 | 1, right: 0 | 1): 0 | 1 => {
  // Convert the three cell states into a binary pattern string
  const pattern = `${left}${center}${right}`;
  // Determine the new state based on Rule 30
  switch (pattern) {
    case '111':
    case '110':
    case '101':
    case '000':
      return 0;
    case '100':
    case '011':
    case '010':
    case '001':
      return 1;
    default:
      return 0; // Fallback, although this shouldn't occur
  }
};

// Gets the next state of the grid based on the current grid using Rule 30
const getNextState = (grid: (0 | 1)[][]): (0 | 1)[][] => {
  const newGrid: (0 | 1)[][] = grid.map((arr) => [...arr]);

  for (let row = 1; row < M; row++) {
    for (let col = 0; col < N; col++) {
      const left = grid[row - 1][col - 1] || 0; // Use 0 if out of bounds
      const center = grid[row - 1][col];
      const right = grid[row - 1][col + 1] || 0; // Use 0 if out of bounds
      newGrid[row][col] = applyRule30(left, center, right);
    }
  }

  return newGrid;
};

const CellularAutomata: FC = () => {
  const [grid, setGrid] = useState<(0 | 1)[][]>(generateInitialGrid);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => getNextState(prevGrid));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const resetGrid = () => {
    setGrid(generateInitialGrid());
  };

  return (
    <Paper elevation={3} sx={{ width: 500, padding: 2, maxWidth: 500, margin: "auto" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box display="flex" flexDirection="column" gap={0.5}>
          {grid.map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" gap={0.5}>
              {row.map((cell, cellIndex) => (
                <Box
                  key={cellIndex}
                  width={20}
                  height={20}
                  bgcolor={cell ? "black" : "white"}
                  border={1}
                  borderColor="gray"
                />
              ))}
            </Box>
          ))}
        </Box>
        <Button variant="contained" onClick={resetGrid}>
          Randomize Grid
        </Button>
      </Box>
    </Paper>
  );
};

export default CellularAutomata;
