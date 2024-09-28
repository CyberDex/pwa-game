import { Layout } from '@pixi/layout';
import { CoinBarLayout } from 'layout/TopBar/CoinBarLayout';
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
                        position: 'left',
                        width: '20%',
                    },
                },
                {
                    content: new CoinBarLayout(),
                    styles: {
                        position: 'topCenter',
                        width: '70%',
                        marginLeft: 20,
                        marginTop: -50,
                    },
                },
                {
                    content: new ShieldLayout(),
                    styles: {
                        position: 'right',
                        width: '10%',
                    },
                },
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
