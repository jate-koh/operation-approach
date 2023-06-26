import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import eslint from 'vite-plugin-eslint';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [
            react(), 
            // eslint({ 
            //     include: ['src/**/*.{ts,tsx}'], 
            //     exclude: ['node_modules', 'dist'] 
            // }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            // If not set, default to 3000
            port: Number.parseInt(process.env.VITEPORT || '3000'),
            
            // If not set, default to localhost
            host: process.env.VITEHOST || 'localhost',
        },

        // If not set, default to /
        base: process.env.VITEBASE || '/',
        define: {
            'process.env': process.env,
            app_version: JSON.stringify(process.env.npm_package_version),
        },
        
        build: {
            outDir: 'dist',
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom'],
                    },
                },
            },

            commonjsOptions: {
                include: [/node_modules/],
            }
        },
    });
};
