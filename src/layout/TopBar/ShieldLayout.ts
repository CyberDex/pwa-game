import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class ShieldLayout extends Layout {
    constructor() {
        super({
            content: {
                content: Sprite.from('ui/shield'),
            },
            styles: {
                position: 'rightTop',
                maxWidth: '100%',
                maxHeight: '70%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Shield!!!');
        });
    }
}
