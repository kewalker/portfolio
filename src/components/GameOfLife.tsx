import { Box, Paper, Button } from "@mui/material";
import { FC, useState, useEffect } from "react";

const M: number = 15;
const N: number = 15;

const generateRandomGrid = (): (0 | 1)[][] => {
	return Array.from({ length: M }, () =>
		Array.from({ length: N }, () => (Math.random() > 0.7 ? 1 : 0))
	);
};

const GameOfLife: FC = () => {
	const [grid, setGrid] = useState<(0 | 1)[][]>(generateRandomGrid);

	const getNextState = (currentGrid: (0 | 1)[][]): (0 | 1)[][] => {
		const newGrid = currentGrid.map(arr => [...arr]);

		const directions = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1],           [0, 1],
			[1, -1], [1, 0], [1, 1]
		];

		for (let i = 0; i < M; i++) {
			for (let j = 0; j < N; j++) {
				let liveNeighbors = 0;

				directions.forEach(([dx, dy]) => {
					const x = i + dx;
					const y = j + dy;
					if (x >= 0 && x < M && y >= 0 && y < N) {
						liveNeighbors += currentGrid[x][y];
					}
				});

				if (currentGrid[i][j] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
					newGrid[i][j] = 0; // Cell dies
				} else if (currentGrid[i][j] === 0 && liveNeighbors === 3) {
					newGrid[i][j] = 1; // Cell becomes alive
				}
			}
		}
		return newGrid;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setGrid(prevGrid => getNextState(prevGrid));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const resetGrid = () => {
		setGrid(generateRandomGrid());
	};

	return (
		<Paper elevation={3} sx={{ width: 500, padding: 2, maxWidth: 500, margin: 'auto' }}>
			<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
				<Box display="flex" flexDirection="column" gap={0.5}>
					{grid.map((row, rowIndex) => (
						<Box key={rowIndex} display="flex" gap={0.5}>
							{row.map((cell, cellIndex) => (
								<Box
									key={cellIndex}
									width={20}
									height={20}
									bgcolor={cell ? 'black' : 'white'}
									border={1}
									borderColor="gray"
								/>
							))}
						</Box>
					))}
				</Box>
				<Button variant="contained" onClick={resetGrid}>Randomize Grid</Button>
			</Box>
		</Paper>
	);
}

export default GameOfLife;
