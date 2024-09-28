import { Layout } from '@pixi/layout';
import { Group } from 'tweedle.js';
import { plugins } from 'plugins';

export class MainScreen extends Layout {
    constructor() {
        super({
            styles: {
                position: 'center',
                width: '100%',
                height: '100%',
            },
        });

        plugins.renderer.pixi.renderer.events.autoPreventDefault = false;
        plugins.renderer.pixi.renderer.view.style.touchAction = 'auto';
    }

    public update(): void {
        Group.shared.update();
    }
}
