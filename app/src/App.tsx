import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeRoute } from './routes/home-route';
import { SinglePlaylistRoute } from './routes/single-playlist-route';
import { TimelineRoute } from './routes/timeline-route';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="timeline" element={<TimelineRoute />} />
          <Route path="playlists">
            <Route path=":id" element={<SinglePlaylistRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
