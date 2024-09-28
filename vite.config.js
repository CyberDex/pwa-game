import { defineConfig, splitVendorChunkPlugin } from 'vite';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import eslintPlugin from '@nabla/vite-plugin-eslint';

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
    ];

    return {
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
        base: '/',
        resolve: {
            alias: {
                layout: '/src/layout',
                plugins: '/src/plugins',
            },
        },
    };
});
