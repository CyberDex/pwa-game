# Pixi Game example that can be used as PWA application and work offline

## Technologies

-   it uses pixi.js for rendering and vite for bundling
-   it bundles the assets with pixi assetpack
-   for adaptive UI it uses pixi-layout plugin

## PWA

For the PWA it uses workbox and vite-plugin-pwa
All the configs live in `vite.config.js`

for the PWA to work you have to deploy the app

## Deployment

The app is auto deployed to github pages and lives under the URL: https://cyberdex.github.io/pwa-game/

## Development

`npm start`

-   The app is rendered in 1 Draw call. You may measure on localhost with the DevTools (in the left top corner):

1. EnablePixi stats
2. Click 3 times on the stats block on the left bottom corner
