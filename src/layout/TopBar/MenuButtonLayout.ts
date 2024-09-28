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
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Menu!!!');
        });
    }
}
