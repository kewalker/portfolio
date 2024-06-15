import React, { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';

const TemperatureConverter: React.FC = () => {
	const [celsius, setCelsius] = useState<string>('');
	const [fahrenheit, setFahrenheit] = useState<string>('');

	const handleCelsiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const celsiusValue = event.target.value;
		setCelsius(celsiusValue);

		if (!isNaN(Number(celsiusValue))) {
			const fahrenheitValue = (Number(celsiusValue) * 9) / 5 + 32;
			setFahrenheit(fahrenheitValue.toFixed(2));
		} else {
			setFahrenheit('');
		}
	};

	const handleFahrenheitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fahrenheitValue = event.target.value;
		setFahrenheit(fahrenheitValue);

		if (!isNaN(Number(fahrenheitValue))) {
			const celsiusValue = ((Number(fahrenheitValue) - 32) * 5) / 9;
			setCelsius(celsiusValue.toFixed(2));
		} else {
			setCelsius('');
		}
	};

	return (
		<Paper elevation={3} sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
			<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
				<Box display="flex" justifyContent="space-between" width="100%">
					<TextField
						label="Celsius"
						variant="outlined"
						value={celsius}
						onChange={handleCelsiusChange}
						sx={{ flex: 1, marginRight: 2 }}
					/>
					<TextField
						label="Fahrenheit"
						variant="outlined"
						value={fahrenheit}
						onChange={handleFahrenheitChange}
						sx={{ flex: 1 }}
					/>
				</Box>

			</Box>
		</Paper>
	);
};

export default TemperatureConverter;
