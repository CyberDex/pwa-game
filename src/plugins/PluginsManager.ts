/* eslint-disable no-console */
import type { DevTools } from './DevTools/DevTools';
import type { Preload } from './Preload';
import type { Renderer } from './Renderer';
import type { UI } from './UI';
import type { Ticker } from './Ticker';

class Manager {
    private registry: Map<string, Plugin> = new Map();

    async init() {
        await this.initPlugins(this.registry);
        await this.postInitPlugins(this.registry);
    }

    private async initPlugins(registry: Map<string, Plugin>) {
        const plugins = Array.from(registry, ([name, plugin]) => ({ name, plugin }));

        for (const { plugin } of plugins) {
            if (plugin.init) {
                await plugin.init();
            }
        }
    }

    private async postInitPlugins(registry: Map<string, Plugin>) {
        const plugins = Array.from(registry, ([name, plugin]) => ({ name, plugin }));

        for (const { plugin } of plugins) {
            if (plugin.onPluginsManagerInit) {
                await plugin.onPluginsManagerInit(this);
            }
        }
    }

    addList<T extends Plugin>(pluginsList: T[]): T[] {
        const plugins: T[] = [];

        for (const p of pluginsList) {
            this.add(p);
        }

        return plugins;
    }

    add<T extends Plugin>(plugin: T): T {
        this.registry.set(plugin.name, plugin);

        return plugin;
    }

    get<T extends Plugin>(pluginName: string): T | undefined {
        return this.registry.get(pluginName) as T;
    }

    remove(pluginName: string) {
        const plugin = this.get(pluginName);

        if (!plugin) {
            return;
        }

        if (plugin) {
            this.registry.delete(pluginName);

            if (plugin.onRemoveFromPluginsManager) {
                plugin.onRemoveFromPluginsManager();
            }
        }
    }

    get devTools(): DevTools {
        const plugin = this.get('DevTools') as DevTools;

        if (!plugin) {
            throw new Error('DevTools plugin is not initialized');
        }

        return plugin;
    }

    get preload(): Preload {
        const plugin = this.get('Preload') as Preload;

        if (!plugin) {
            throw new Error('Preload plugin is not initialized');
        }

        return plugin;
    }

    get renderer(): Renderer {
        const plugin = this.get('Renderer') as Renderer;

        if (!plugin) {
            throw new Error('Renderer plugin is not initialized');
        }

        return plugin;
    }

    get ticker(): Ticker {
        const plugin = this.get('Ticker') as Ticker;

        if (!plugin) {
            throw new Error('Ticker plugin is not initialized');
        }

        return plugin;
    }

    get ui(): UI {
        const plugin = this.get('UI') as UI;

        if (!plugin) {
            throw new Error('UI plugin is not initialized');
        }

        return plugin;
    }

    get registeredPlugins(): Plugin[] {
        const registeredPlugins: Plugin[] = [];

        this.registry.forEach((plugin) => {
            registeredPlugins.push(plugin);
        });

        return registeredPlugins;
    }

    isInitialized(pluginName: PluginName): boolean {
        return this.registry.has(pluginName);
    }
}

export type PluginName = 'UI' | 'Renderer' | 'Preload' | 'Ticker' | 'DevTools';

export interface Plugin {
    name: PluginName;
    init?(): Promise<void>;
    onPluginsManagerInit?: (pluginsManager: Manager) => Promise<any>;
    onRemoveFromPluginsManager?: () => Promise<any>;
}

export type PluginsManager = Manager;
export const plugins = new Manager();
