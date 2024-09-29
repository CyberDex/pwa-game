import { defineConfig, splitVendorChunkPlugin } from 'vite';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';

    const eslintPluginSettings = {
        failOnWarning: isProd,
        failOnError: isProd,
    };

    const plugins = [
        splitVendorChunkPlugin(),
        ConditionalCompile(),
        eslintPlugin(eslintPluginSettings),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
            },
            manifest: {
                name: 'Game',
                short_name: 'Game',
                description: 'Description',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'assets/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'assets/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ];

    return {
        base: '/pwa-game/',
        build: {
            minify: mode === 'production',
            sourcemap: true,
            rollupOptions: {
                output: {
                    chunkFileNames: `assets/[name].js`,
                    manualChunks: {
                        'js/pixiCore': ['@pixi/core', '@pixi/app', '@pixi/constants'],
                        'js/pixiAddons': ['@pixi/spritesheet', '@pixi/layout', '@pixi/ui'],
                    },
                },
            },
        },
        plugins,
        server: {
            host: true,
            port: 4200,
        },
        define: {
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
            APP_NAME: JSON.stringify(process.env.npm_package_name),
        },
        envDir: 'env',
        resolve: {
            alias: {
                layout: '/src/layout',
                plugins: '/src/plugins',
            },
        },
    };
});
