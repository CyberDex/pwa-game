// #v-ifdef !VITE_IS_PROD
import { DevTools } from './DevTools';
import { plugins } from '../';

plugins.add(new DevTools());
// #v-endif
