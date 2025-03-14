import type { App } from 'vue';
import { setupPermissionDirective } from './auth';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
}
