import type { Plugin } from './PluginsManager';
import type { AssetsManifest } from '@pixi/assets';
import '@pixi/spritesheet';
import { Assets } from '@pixi/assets';

export type ProgressFunction = (progress: number) => void;

export class Preload implements Plugin {
    readonly name = 'Preload';
    /** List of assets grouped in bundles, for dynamic loading */
    private assetsManifest: AssetsManifest = { bundles: [] };

    /** Store bundles already loaded */
    private loadedBundles: string[] = [];

    constructor(private readonly manifest?: string) {}

    /** Initialize the plugin */
    async init(onProgress?: ProgressFunction) {
        if (this.manifest) {
            // Load assets manifest
            this.assetsManifest = await this.fetchAssetsManifest(this.manifest);

            // Init PixiJS assets with this asset manifest
            await Assets.init({ manifest: this.assetsManifest, basePath: 'assets' });

            // Load assets for the load screen
            await this.loadBundles(['default'], onProgress);
        }
    }

    /**
     * Check if a bundle exists in assetManifest
     * @param bundle
     */
    private checkBundleExists(bundle: string) {
        return !!this.assetsManifest.bundles.find((b) => b.name === bundle);
    }

    /**
     * Load assets bundles that have not been loaded yet
     * @param bundles
     */
    async loadBundles(bundles: string | string[], onProgress?: ProgressFunction) {
        if (typeof bundles === 'string') bundles = [bundles];

        // Check bundles requested if they exists
        for (const bundle of bundles) {
            if (!this.checkBundleExists(bundle)) {
                throw new Error(`[Assets] Invalid bundle: ${bundle}`);
            }
        }

        // Filter out bundles already loaded
        const loadList = bundles.filter((bundle) => !this.loadedBundles.includes(bundle));

        // Skip if there is no bundle left to be loaded
        if (!loadList.length) return;

        // Load bundles
        await Assets.loadBundle(loadList, (progress) => {
            if (onProgress) {
                onProgress(progress * 100);
            }
        });

        // Append loaded bundles to the loaded list
        this.loadedBundles.push(...loadList);
    }

    /**
     * Check if all bundles are loaded, return false if any of them is not loaded yet
     * @param bundles
     */
    bundlesLoaded(bundles: string[]) {
        for (const name of bundles) {
            // Return false if a single bundle is not present in the loaded list
            if (!this.loadedBundles.includes(name)) {
                return false;
            }
        }

        // All provided bundles are loaded
        return true;
    }

    /**
     * Load the assets json manifest generated by asset pack
     * @param url
     */
    private async fetchAssetsManifest(url: string): Promise<AssetsManifest> {
        const response = await fetch(url);
        const manifest = await response.json();

        if (!manifest.bundles) {
            throw new Error('[Assets] Invalid assets manifest');
        }

        return manifest;
    }
}
