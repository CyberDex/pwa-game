import { Layout } from '@pixi/layout';
import { BottomBarLayout } from 'layout/BottomBar/BottomBarLayout';
import { LeftButton } from 'layout/BottomBar/LeftButtonLayout';
import { RightButton } from 'layout/BottomBar/RightButtonLayout';
import { TopBarLayout } from 'layout/TopBar/TopBarLayout';

export class UILayout extends Layout {
    constructor() {
        super({
            content: [
                new TopBarLayout(),
                new BottomBarLayout(),
                new LeftButton(),
                new RightButton(),
            ],
            styles: {
                position: 'center',
                width: `100%`,
                height: `100%`,
                overflow: 'hidden',
            },
        });
    }
}
