import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class MenuButtonLayout extends Layout {
    constructor() {
        super({
            content: {
                content: Sprite.from('ui/MenuIcon'),
            },
            styles: {
                position: 'leftCenter',
                maxWidth: '50%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Menu!!!');
        });
    }
}
