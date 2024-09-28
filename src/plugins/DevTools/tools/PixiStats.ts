import ls from 'localstorage-slim';
import type { StatsJSAdapter } from 'pixi-stats';
import type { Application } from '@pixi/app';
import { addStats } from 'pixi-stats';
import { UPDATE_PRIORITY } from '@pixi/ticker';

type Styles = {
    [key: string]: string;
};

const offsets = {
    x: 40,
    y: 24,
};
const defaultScale = 0.6;
const defaultStyles: Styles = {
    position: 'fixed',
    left: `-${offsets.x}px`,
    bottom: `-${offsets.y}px`,
    opacity: '0.6',
    'user-select': ' none',
    scale: `${defaultScale}`,
};

export class PixiStats {
    private stats: StatsJSAdapter;
    private element!: HTMLElement;

    constructor(pixi: Application) {
        this.stats = addStats(document, pixi as any);

        pixi.ticker.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);

        const element = document.getElementById('stats');

        if (element) {
            this.element = element;
        }

        this.stats.stats.domElement.addEventListener('pointerup', () => {
            setTimeout(() => {
                ls.set('stats-mode', this.stats.stats.mode);
            }, 10);
        });

        this.stats.stats.setMode(ls.get('stats-mode') ?? 0);

        this.setStyles(defaultStyles);
    }

    setStyles(styles: Styles) {
        if (!this.element) {
            throw new Error('Stats element not found');
        }

        for (const style in styles) {
            this.element.style.setProperty(style, styles[style]);
        }
    }

    remove() {
        if (!this.element) {
            throw new Error('Stats element not found');
        }

        this.element.remove();
    }
}
