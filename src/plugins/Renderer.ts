import '@pixi/events';
import '@pixi/sprite-tiling';
import type { IApplicationOptions } from '@pixi/app';
import type { Plugin, PluginsManager } from './PluginsManager';
import { Application } from '@pixi/app';
import { Signal } from 'typed-signals';
import { Ticker } from '@pixi/ticker';
import { UPDATE_PRIORITY } from '@pixi/ticker';

let plugins: PluginsManager;

export class Renderer implements Plugin {
    readonly name = 'Renderer';
    #view: HTMLElement;
    #quality: Quality = 'high';
    private fpsWarning = 0;
    private warnFPS = 30;
    private warnFPSDelaySeconds = 5;
    private minWidth = 375;
    private minHeight = 700;

    pixi: Application<HTMLCanvasElement>;

    onResize: Signal<(w: number, h: number) => void> = new Signal();

    constructor(options?: RendererSettings) {
        this.pixi = new Application({
            resolution: getResolution(),
            backgroundAlpha: 0,
            ...options?.pixi,
            sharedTicker: true,
        });

        this.minWidth = options?.minWidth ?? this.minWidth;
        this.minHeight = options?.minHeight ?? this.minHeight;

        this.#view = this._createView();
        this.#view.appendChild(this.pixi.view);
    }

    async init() {
        this.subscribeResize();
        this.resize();
    }

    async onPluginsManagerInit(pluginsManager: PluginsManager) {
        plugins = pluginsManager;

        if (plugins.isInitialized('Ticker')) {
            Ticker.shared.autoStart = false;
            Ticker.shared.stop();
            plugins.ticker.add(this.update);
        }

        this.trackFPS();
    }

    setView(view: HTMLElement | undefined) {
        if (!view) {
            return;
        }

        document.body.removeChild(this.#view);

        this.#view = view;
        this.#view.appendChild(this.pixi.view);

        this.resize();
    }

    protected trackFPS() {
        this.pixi.ticker.add(this.trackFpsUpdate, this, UPDATE_PRIORITY.LOW);
    }

    protected stopTrackFPS() {
        this.fpsWarning = 0;
        this.pixi.ticker.remove(this.trackFpsUpdate, this);
    }

    protected update = (time: number) => {
        this.pixi.ticker.update(time);
    };

    protected trackFpsUpdate(): void {
        const warnFPSDelay = 60 * this.warnFPSDelaySeconds;

        if (this.pixi.ticker.FPS < this.warnFPS) {
            this.fpsWarning++;

            if (this.fpsWarning >= warnFPSDelay) {
                this.stopTrackFPS();

                this.quality = 'low';
            }
        }
    }

    protected subscribeResize() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('deviceorientation', () => this.resize());
    }

    protected resize() {
        const { width, height } = this.getAppSize();

        const windowWidth = this.#view.clientWidth;
        const windowHeight = this.#view.clientHeight;

        // Update canvas style dimensions and scroll window up to avoid issues on mobile resize

        this.pixi.renderer.view.style.width = `${windowWidth}px`;
        this.pixi.renderer.view.style.height = `${windowHeight}px`;
        window.scrollTo(0, 0);

        // Update renderer  and navigation screens dimensions
        this.pixi.renderer.resize(width, height);

        this.onResize.emit(width, height);
    }

    protected getAppSize(): {
        width: number;
        height: number;
    } {
        const windowWidth = this.#view.clientWidth;
        const windowHeight = this.#view.clientHeight;

        // Calculate renderer and canvas sizes based on current dimensions
        const scaleX = windowWidth < this.minWidth ? this.minWidth / windowWidth : 1;
        const scaleY = windowHeight < this.minHeight ? this.minHeight / windowHeight : 1;

        const scale = scaleX > scaleY ? scaleX : scaleY;
        const width = windowWidth * scale;
        const height = windowHeight * scale;

        return { width, height };
    }

    private _createView(): HTMLElement {
        const view = document.createElement('div');

        view.id = 'renderer_initial_view';
        view.style.position = 'fixed';
        view.style.width = '100%';
        view.style.height = '100%';

        document.body.appendChild(view);

        return view;
    }

    set quality(quality: Quality) {
        this.#quality = quality;
    }

    get quality(): Quality {
        return this.#quality;
    }

    get ticker(): Ticker {
        return this.pixi.ticker;
    }

    get width(): number {
        return this.getAppSize().width;
    }

    get height(): number {
        return this.getAppSize().height;
    }
}

export type Quality = 'low' | 'high';

type RendererSettings = {
    pixi?: Partial<IApplicationOptions>;
    minWidth?: number;
    minHeight?: number;
};

export function getResolution(): number {
    let resolution = Math.max(window.devicePixelRatio, 2);

    if (resolution % 1 !== 0) {
        resolution = 2;
    }

    return resolution;
}
