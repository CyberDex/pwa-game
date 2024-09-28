import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class LeftButton extends Layout {
    constructor() {
        super({
            content: {
                bg: {
                    content: Sprite.from('ui/LeftButton'),
                },
                icon: {
                    content: Sprite.from('ui/HomeIcon'),
                    styles: {
                        position: 'center',
                    },
                },
            },
            styles: {
                position: 'leftBottom',
                marginLeft: 20,
                marginBottom: 20,
                maxWidth: '25%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Home!!!');
        });
    }
}
