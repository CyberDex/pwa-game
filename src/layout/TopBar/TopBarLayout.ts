import { Layout } from '@pixi/layout';
import { MenuButtonLayout } from 'layout/TopBar/MenuButtonLayout';
import { ShieldLayout } from 'layout/TopBar/ShieldLayout';
import { UserIconLayout } from 'layout/TopBar/UserIconLayout';

export class TopBarLayout extends Layout {
    constructor() {
        super({
            content: [
                {
                    content: [new MenuButtonLayout(), new UserIconLayout()],
                    styles: {
                        width: 140,
                        height: '100%',
                        maxWidth: '30%',
                    },
                },
                new ShieldLayout(),
            ],
            styles: {
                position: 'centerTop',
                width: `95%`,
                height: `7%`,
                marginTop: 10,
            },
        });
    }
}
