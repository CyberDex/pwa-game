import { json } from '@assetpack/plugin-json';
import { pixiManifest } from '@assetpack/plugin-manifest';
import { pixiTexturePacker } from '@assetpack/plugin-texture-packer';
import { webfont } from '@assetpack/plugin-webfont';

export default {
    entry: './assets',
    output: './public/assets/',
    cache: false,
    plugins: {
        webfont: webfont(),
        json: json(),
        texture: pixiTexturePacker({
            texturePacker: {
                removeFileExtension: true,
            },
            resolutionOptions: {
                resolutions: {
                    '1x': 1,
                },
            },
        }),
        manifest: pixiManifest({
            output: './public/assets/assets-manifest.json',
            createShortcuts: true,
            trimExtensions: true,
        }),
    },
};
