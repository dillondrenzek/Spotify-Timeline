import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Nav } from './app/Nav';
import './App.scss';
import { SavedTracksTable } from './app/saved-tracks-table';

function App() {
  return (
    <Container>
      <Nav />
      <Box sx={{ mt: 8 }}>
        <Typography variant="h2">Saved Tracks</Typography>
        <SavedTracksTable />
      </Box>
    </Container>
  );
}

export default App;
