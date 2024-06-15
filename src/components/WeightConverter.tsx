import { Box, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'

const WeightConverter: React.FC = () => {
	const [kilograms, setKilograms] = useState<string>('');
	const [pounds, setPounds] = useState<string>('');

	const handleKilogramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const kilogramValue = event.target.value;
		setKilograms(kilogramValue);

		if (!isNaN(Number(kilogramValue))) {
			const poundValue = (Number(kilogramValue) * 2.20462);
			setPounds(poundValue.toFixed(2));
		} else {
			setPounds('');
		}
	}

	const handlePoundsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const poundsValue = event.target.value;
		setPounds(poundsValue);

		if (!isNaN(Number(poundsValue))) {
			const poundValue = (Number(poundsValue) * 0.453592);
			setKilograms(poundValue.toFixed(2));
		} else {
			setKilograms('');
		}
	}

	return (
		<Paper elevation={3} sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
			<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
				<Box display="flex" justifyContent={'space-between'} width="100%">
					<TextField
						label="Kilograms"
						variant="outlined"
						value={kilograms}
						onChange={handleKilogramsChange}
						sx={{ flex: 1, marginRight: 2 }}
					/>
					<TextField
						label="Pounds"
						variant="outlined"
						value={pounds}
						onChange={handlePoundsChange}
						sx={{ flex: 1, marginRight: 2 }}
					/>
				</Box>
			</Box>
		</Paper>
	);
};

export default WeightConverter;