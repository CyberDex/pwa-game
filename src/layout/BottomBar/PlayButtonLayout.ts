import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class PlayButton extends Layout {
    constructor() {
        super({
            content: {
                content: Sprite.from('ui/PlayIcon'),
                styles: {
                    position: 'center',
                    marginTop: -10,
                },
            },
            styles: {
                background: Sprite.from('ui/Button'),
                position: 'centerTop',
                maxWidth: 200,
                marginTop: -95,
                marginLeft: -7,
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Play!!!');
        });
    }
}
