import dotenv from 'dotenv';

export default function() {
  const config = dotenv.config();

  if (config.error) {
    console.error('Error: no .env file found!');
    process.exit(1);
  }
  
  return dotenv.config();
}
