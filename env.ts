import dotenv from 'dotenv';

export interface AppEnvironment {
  PORT: number;
  CLIENT_BASE_URL: string;
  SPOTIFY_API_CLIENT_ID: string;
  SPOTIFY_API_CLIENT_SECRET: string;
  SPOTIFY_API_REDIRECT_URI: string;
}

export default function (): AppEnvironment {
  const { error, parsed } = dotenv.config();

  if (error && !process.env) {
    console.error('Error: no .env file found!');
    process.exit(1);
  }

  return {
    PORT: parseInt(parsed?.PORT || process.env.PORT, 10),
    CLIENT_BASE_URL: parsed?.CLIENT_BASE_URL || process.env.CLIENT_BASE_URL,
    SPOTIFY_API_CLIENT_ID:
      parsed?.SPOTIFY_API_CLIENT_ID || process.env.SPOTIFY_API_CLIENT_ID,
    SPOTIFY_API_CLIENT_SECRET:
      parsed?.SPOTIFY_API_CLIENT_SECRET ||
      process.env.SPOTIFY_API_CLIENT_SECRET,
    SPOTIFY_API_REDIRECT_URI:
      parsed?.SPOTIFY_API_REDIRECT_URI || process.env.SPOTIFY_API_REDIRECT_URI,
  };
}
