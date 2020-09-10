import React from "react";
import { CurrentUserProfile } from "../../../hooks/use-current-user";

export interface SpotifyLoginButtonProps {
  currentUser?: CurrentUserProfile;
}

export const SpotifyLoginButton = ({
  currentUser,
}: SpotifyLoginButtonProps) => {
  return currentUser ? (
    <a className="App-link" href="/spotify/logout" rel="noopener noreferrer">
      Logout
    </a>
  ) : (
    <a className="App-link" href="/spotify/login" rel="noopener noreferrer">
      Login
    </a>
  );
};
