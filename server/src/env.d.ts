/* eslint-disable no-unused-vars */
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    // Define other environment variables here
  }
}

export {};
