import { Layout } from '@pixi/layout';
import { Sprite } from '@pixi/sprite';
import { Group } from 'tweedle.js';
import { plugins } from 'plugins';

export class MainScreen extends Layout {
    constructor() {
        super({
            content: [
                {
                    content: Sprite.from('bg'),
                    styles: {
                        position: 'bottom',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        minHeight: '100%',
                        minWidth: '100%',
                    },
                },
                {
                    content: Sprite.from('cloud'),
                    styles: {
                        position: 'topCenter',
                        maxWidth: '100%',
                        maxHeight: '40%',
                    },
                },
                {
                    content: Sprite.from('city'),
                    styles: {
                        position: 'center',
                        maxWidth: '115%',
                        maxHeight: '125%',
                        marginTop: 100,
                    },
                },
            ],
            styles: {
                position: 'center',
                width: `100%`,
                height: `100%`,
                overflow: 'hidden',
            },
        });

        plugins.renderer.pixi.renderer.events.autoPreventDefault = false;
        plugins.renderer.pixi.renderer.view.style.touchAction = 'auto';
    }

    public update(): void {
        Group.shared.update();
    }
}
