import React, { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface ButtonBarProps {
	currentPage: string;
	onPageChange: (page: string) => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ currentPage, onPageChange }) => {
	const handleButtonClick = (page: string) => {
		onPageChange(page);
	};
	
	return (
		<AppBar position="fixed">
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Typography textAlign='left' >Portfolio</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button color="inherit" onClick={() => handleButtonClick('Home')} disabled={currentPage === 'Home'}>
						Home
					</Button>
					<Button color="inherit" onClick={() => handleButtonClick('About')} disabled={currentPage === 'About'}>
						About
					</Button>
					<Button color="inherit" onClick={() => handleButtonClick('Contact')} disabled={currentPage === 'Contact'}>
						Contact
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default ButtonBar;
