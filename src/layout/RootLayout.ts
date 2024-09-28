import { Layout } from '@pixi/layout';
import { Sprite } from '@pixi/sprite';
import { UILayout } from 'layout/UILayout';
import { plugins } from 'plugins';

export class RootLayout extends Layout {
    constructor() {
        super({
            content: {
                bg: {
                    content: Sprite.from('bg'),
                    styles: {
                        position: 'bottomRight',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        minHeight: '100%',
                        minWidth: '100%',
                    },
                },
                cloud1: {
                    content: Sprite.from('cloud'),
                    styles: {
                        position: 'topCenter',
                        marginTop: -100,
                    },
                },
                cloud2: {
                    content: Sprite.from('cloud2'),
                    styles: {
                        position: 'topCenter',
                        marginTop: 0,
                        marginLeft: 0,
                    },
                },
                city: {
                    content: Sprite.from('city'),
                    styles: {
                        position: 'center',
                        maxWidth: '115%',
                        maxHeight: '125%',
                        marginTop: 100,
                    },
                },
                cloud3: {
                    content: Sprite.from('cloud3'),
                    styles: {
                        position: 'topCenter',
                    },
                },
                ui: new UILayout(),
            },
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
}
