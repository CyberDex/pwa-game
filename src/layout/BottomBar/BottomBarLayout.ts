import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { PlayButton } from 'layout/BottomBar/PlayButtonLayout';

export class BottomBarLayout extends Layout {
    constructor() {
        super({
            content: {
                bgLight: {
                    content: Sprite.from('ui/BottomLight'),
                    styles: {
                        position: 'centerBottom',
                        opacity: 0.6,
                    },
                },
                bg: {
                    content: Sprite.from('ui/BottomBarBG'),
                    styles: {
                        position: 'centerBottom',
                    },
                },
                playButton: new PlayButton(),
            },
            styles: {
                position: 'centerBottom',
                maxWidth: '70%',
                marginLeft: 4,
            },
        });
    }
}
