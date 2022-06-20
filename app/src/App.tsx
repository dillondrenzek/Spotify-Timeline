import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeRoute } from './routes/home-route';
import { SinglePlaylistRoute } from './routes/single-playlist-route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="playlists">
          <Route path=":id" element={<SinglePlaylistRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
