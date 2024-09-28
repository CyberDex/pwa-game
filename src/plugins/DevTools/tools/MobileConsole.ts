import eruda from 'eruda';
import ls from 'localstorage-slim';

export const lsName = 'mobile-console';

const isEnabled = ls.get(lsName);
let erudaInitiated = false;

if (isEnabled === true) {
    initMobileConsole();
}

export function initMobileConsole() {
    ls.set(lsName, true);

    if (erudaInitiated) return;

    erudaInitiated = true;

    eruda.init();
    eruda.position({ x: -20, y: window.innerHeight });
    window.addEventListener('resize', () => {
        eruda.position({ x: window.innerWidth / 2 - 20, y: window.innerHeight });
    });
}

export function removeMobileConsole() {
    ls.set(lsName, false);

    if (!erudaInitiated) return;

    eruda.destroy();
    erudaInitiated = false;
}
