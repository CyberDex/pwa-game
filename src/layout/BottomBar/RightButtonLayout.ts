import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class RightButton extends Layout {
    constructor() {
        super({
            content: {
                bg: {
                    content: Sprite.from('ui/RightButton'),
                },
                icon: {
                    content: Sprite.from('ui/NewsIcon'),
                    styles: {
                        position: 'center',
                    },
                },
            },
            styles: {
                position: 'rightBottom',
                marginRight: 20,
                marginBottom: 20,
                maxWidth: '25%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('News!!!');
        });
    }
}
