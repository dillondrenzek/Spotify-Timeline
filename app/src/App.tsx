import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginRoute } from './routes/login-route';
import { SavedSongsRoute } from './routes/saved-songs-route';
import { SinglePlaylistRoute } from './routes/single-playlist-route';
import { TimelineRoute } from './routes/timeline-route';
import { useUserStore } from './stores/use-user-store';

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isAuthenticated } = useUserStore();

  // If no user, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User present, display children
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <TimelineRoute />
            </RequireAuth>
          }
        />
        <Route path="playlists">
          <Route
            path=":id"
            element={
              <RequireAuth>
                <SinglePlaylistRoute />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="login" element={<LoginRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
