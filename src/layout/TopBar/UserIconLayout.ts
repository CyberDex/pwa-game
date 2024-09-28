import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class UserIconLayout extends Layout {
    constructor() {
        super({
            content: {
                content: Sprite.from('ui/UserIcon'),
            },
            styles: {
                position: 'rightCenter',
                maxHeight: '100%',
                maxWidth: '50%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('User!!!');
        });
    }
}
