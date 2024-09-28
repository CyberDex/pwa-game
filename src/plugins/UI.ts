import type { PluginsManager } from './PluginsManager';
import type { Container } from '@pixi/display';
import { pool } from './utils/pool';

let plugins: PluginsManager;

export class UI {
    readonly name = 'UI';

    public currentScreen?: AppScreen;
    public currentPopup?: AppScreen;

    async init() {
        document.addEventListener('visibilitychange', () => this.onVisibilityChange());
    }

    async onPluginsManagerInit(pluginsManager: PluginsManager) {
        plugins = pluginsManager;

        plugins.renderer.onResize.connect((w, h) => this.resize(w, h));
    }

    private async addAndShowScreen(screen: AppScreen) {
        if (!plugins.renderer) {
            throw new Error('Plugins are not initialized');
        }

        plugins.renderer.pixi.stage.addChild(screen);

        if (screen.prepare) {
            screen.prepare();
        }

        if (screen.resize) {
            screen.resize(plugins.renderer.width, plugins.renderer.height);
        }

        if (screen.update) {
            plugins.renderer.pixi.ticker.add(screen.update, screen);
        }

        if (screen.show) {
            screen.interactiveChildren = false;
            await screen.show();
            screen.interactiveChildren = true;
        }
    }

    private async hideAndRemoveScreen(screen: AppScreen) {
        if (!plugins.renderer) {
            throw new Error('Plugins are not initialized');
        }

        screen.interactiveChildren = false;

        if (screen.hide) {
            await screen.hide();
        }

        if (screen.update) {
            plugins.renderer.pixi.ticker.remove(screen.update, screen);
        }

        if (screen.parent) {
            screen.parent.removeChild(screen);
        }

        if (screen.reset) {
            screen.reset();
        }
    }

    public async showScreen(appScreenConstructor: AppScreenConstructor): Promise<AppScreen> {
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = false;
        }

        const isLoaded = false;

        if (plugins.isInitialized('Preload') && appScreenConstructor.assetBundles) {
            plugins.preload.bundlesLoaded(appScreenConstructor.assetBundles);
        }

        if (appScreenConstructor.assetBundles && !isLoaded) {
            await plugins.preload.loadBundles(appScreenConstructor.assetBundles);
        }

        if (this.currentScreen) {
            await this.hideAndRemoveScreen(this.currentScreen);
        }

        this.currentScreen = pool.get(appScreenConstructor);

        await this.addAndShowScreen(this.currentScreen);

        return this.currentScreen;
    }

    public async presentPopup(Constructor: AppScreenConstructor) {
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = false;
            await this.currentScreen.pause?.();
        }

        if (this.currentPopup) {
            await this.hideAndRemoveScreen(this.currentPopup);
        }

        this.currentPopup = new Constructor();
        await this.addAndShowScreen(this.currentPopup);
    }

    public async dismissPopup() {
        if (!this.currentPopup) return;
        const popup = this.currentPopup;

        this.currentPopup = undefined;
        await this.hideAndRemoveScreen(popup);
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = true;
            this.currentScreen.resume?.();
        }
    }

    public blur() {
        this.currentScreen?.blur?.();
        this.currentPopup?.blur?.();
    }

    public focus() {
        this.currentScreen?.focus?.();
        this.currentPopup?.focus?.();
    }

    private onVisibilityChange() {
        if (document.hidden) {
            this.blur();
        } else {
            this.focus();
        }
    }

    public resize(width: number, height: number) {
        this.currentScreen?.resize?.(width, height);
        this.currentPopup?.resize?.(width, height);
    }
}

export interface AppScreen extends Container {
    /** Show the screen */
    show?(): Promise<void>;
    /** Hide the screen */
    hide?(): Promise<void>;
    /** Pause the screen */
    pause?(): Promise<void>;
    /** Resume the screen */
    resume?(): Promise<void>;
    /** Prepare screen, before showing */
    prepare?(): void;
    /** Reset screen, after hidden */
    reset?(): void;
    /** Update the screen, passing delta time/step */
    update?(delta: number): void;
    /** Resize the screen */
    resize?(width: number, height: number): void;
    /** Blur the screen */
    blur?(): void;
    /** Focus the screen */
    focus?(): void;
    /** Assets load progress callback */
    onProgress?(value: number): void;
}

interface AppScreenConstructor {
    new (): AppScreen;
    /** List of assets bundles required by the screen */
    assetBundles?: string[];
}
