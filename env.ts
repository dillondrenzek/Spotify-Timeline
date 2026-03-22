import dotenv from 'dotenv';

export interface AppEnvironment {
  PORT: number;
  CLIENT_BASE_URL: string;
  SPOTIFY_API_CLIENT_ID: string;
  SPOTIFY_API_CLIENT_SECRET: string;
  SPOTIFY_API_REDIRECT_URI: string;
  LOCAL_HTTPS_ENABLED?: boolean;
  HTTPS_KEY_PATH?: string;
  HTTPS_CERT_PATH?: string;
  HTTPS_CA_PATH?: string;
}

export default function (): AppEnvironment {
  const { error, parsed } = dotenv.config();

  if (error && !process.env) {
    console.error('Error: no .env file found!');
    process.exit(1);
  }

  const httpsEnabledValue =
    parsed?.LOCAL_HTTPS_ENABLED || process.env.LOCAL_HTTPS_ENABLED;

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
    LOCAL_HTTPS_ENABLED:
      typeof httpsEnabledValue === 'string'
        ? httpsEnabledValue.toLowerCase() === 'true'
        : undefined,
    HTTPS_KEY_PATH: parsed?.HTTPS_KEY_PATH || process.env.HTTPS_KEY_PATH,
    HTTPS_CERT_PATH: parsed?.HTTPS_CERT_PATH || process.env.HTTPS_CERT_PATH,
    HTTPS_CA_PATH: parsed?.HTTPS_CA_PATH || process.env.HTTPS_CA_PATH,
  };
}
