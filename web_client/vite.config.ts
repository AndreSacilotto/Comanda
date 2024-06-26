import { CommonServerOptions, defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

const serveConfig: CommonServerOptions = {
	strictPort: true,
	port: 4567,
	open: true,
	host: true,
}

export default defineConfig({
  plugins: [
    // For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    // devtools(),
    solidPlugin(),
  ],
  server: serveConfig,
  preview: serveConfig,
  build: {
    target: 'esnext',
  },
});
