import React, { Component, useState } from 'react';
import { Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/system';

interface CardData {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface SelectableCardsProps {
  cards: CardData[];
}

interface StyledCardProps {
  selected: boolean;
}

const SelectableCard = styled(Card)<StyledCardProps>(({ theme, selected }) => ({
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid #ccc',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const SelectableCards: React.FC<SelectableCardsProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SelectableCard
              selected={selectedCard === index}
              onClick={() => handleCardClick(index)}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography fontSize={12} variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </SelectableCard>
          </Grid>
        ))}
      </Grid>
      {selectedCard !== null && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{cards[selectedCard].title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{cards[selectedCard].description}</DialogContentText>
            {cards[selectedCard].content}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SelectableCards;
