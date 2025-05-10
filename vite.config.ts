import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import envPlugin from './vite-env-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  // Check if we're using mock data - either from env file or explicitly set in the mode
  const useMockData = env.VITE_USE_MOCK_DATA === 'true' || mode === 'mock';
  
  console.log(`Building with mock data: ${useMockData}`);
  
  return {
    plugins: [
      react(),
      envPlugin()
    ],
    define: {
      // Make env variables available for the client
      'import.meta.env.VITE_USE_MOCK_DATA': JSON.stringify(useMockData)
    },
    resolve: {
      alias: {
        src: resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3000,
      proxy: useMockData 
        ? {} // No proxy needed when using mock data
        : {
            '/api': {
              target: 'http://localhost:8000',
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
    }
  };
});