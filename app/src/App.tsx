import React from 'react';
import { Box, Container, Typography, CssBaseline } from '@mui/material';
import { Nav } from './app/Nav';
import { SavedTracksTable } from './app/saved-tracks-table';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Nav />
        <Box sx={{ mt: 8 }}>
          <Typography variant="h2">Saved Tracks</Typography>
          <SavedTracksTable />
        </Box>
      </Container>
    </>
  );
}

export default App;
