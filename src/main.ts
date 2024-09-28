import { plugins } from 'plugins';
import 'plugins/DevTools';
import { Renderer, Preload, UI } from 'plugins';
import { MainScreen } from 'screens/MainScreen';

async function initApp() {
    plugins.add(new Preload('assets/assets-manifest.json'));
    plugins.add(new UI());
    plugins.add(new Renderer());

    await plugins.init();

    await plugins.ui.showScreen(MainScreen);
}

addEventListener('DOMContentLoaded', initApp);
