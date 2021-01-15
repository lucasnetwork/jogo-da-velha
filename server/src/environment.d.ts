/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      SOCKET_CLIENT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
