import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState, FC } from "react";

const CharacterCounter: FC = () => {
	const [text, setText] = useState<string>('');

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	return (
		<Paper elevation={3} sx={{ width: 500, padding: 2, maxWidth: 500, margin: 'auto' }}>
			<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
				<Box display="flex" width="100%" gap={3}>
					<TextField
						label="Enter text"
						variant="outlined"
						fullWidth
						value={text}
						onChange={handleTextChange}
						multiline
						rows={4}
					/>
					<Typography variant="h6">
						Number of characters: {text.length}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
}

export default CharacterCounter;
