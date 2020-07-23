import dotenv from 'dotenv';
import { parse } from 'path';

interface AppEnvironment {
  APP_PORT: number;
  SPOTIFY_API_CLIENT_ID: string;
  SPOTIFY_API_CLIENT_SECRET: string;
  SPOTIFY_API_REDIRECT_URI: string;
}

export default function(): AppEnvironment {
  const { error, parsed } = dotenv.config();

  if (error) {
    console.error('Error: no .env file found!');
    process.exit(1);
  }

  return {
    APP_PORT: parseInt(parsed.APP_PORT, 10),
    SPOTIFY_API_CLIENT_ID: parsed.SPOTIFY_API_CLIENT_ID,
    SPOTIFY_API_CLIENT_SECRET: parsed.SPOTIFY_API_CLIENT_SECRET,
    SPOTIFY_API_REDIRECT_URI: parsed.SPOTIFY_API_REDIRECT_URI
  };
}
