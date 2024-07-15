import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: 500, padding: 2, maxWidth: 500, margin: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextField
          label="Enter text"
          variant="outlined"
          fullWidth
          value={text}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" onClick={handleSpeak}>
          Speak
        </Button>
      </Box>
    </Paper>
  );
};

export default TextToSpeech;
