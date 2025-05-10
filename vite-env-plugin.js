// Custom plugin to ensure environment variables are properly injected
export default function envPlugin() {
  return {
    name: 'vite-env-plugin',
    config(config, { mode }) {
      console.log(`Building in ${mode} mode`);
      
      // Force the VITE_USE_MOCK_DATA to be true when in mock mode
      const useMockData = mode === 'mock';
      console.log(`Using mock data: ${useMockData}`);
      
      return {
        define: {
          'import.meta.env.VITE_USE_MOCK_DATA': JSON.stringify(useMockData)
        }
      };
    }
  };
}