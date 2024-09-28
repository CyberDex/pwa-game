import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { Button } from '@pixi/ui';

export class CoinBarLayout extends Layout {
    constructor() {
        super({
            content: {
                text: {
                    content: '50',
                    styles: {
                        position: 'center',
                        fontSize: 40,
                        color: 'white',
                    },
                },
                coin: {
                    content: Sprite.from('ui/coin'),
                    styles: {
                        position: 'leftCenter',
                        textAlign: 'center',
                    },
                },
                userID: {
                    content: 'user: 9592384723',
                    styles: {
                        position: 'center',
                        fontSize: 32,
                        color: 'black',
                        marginTop: 70,
                    },
                },
            },
            styles: {
                position: 'center',
                background: Sprite.from('ui/coin_bg'),
                maxWidth: '100%',
                maxHeight: '50%',
            },
        });

        new Button(this).onPress.connect(() => {
            console.log('Coins!!!');
        });
    }
}
