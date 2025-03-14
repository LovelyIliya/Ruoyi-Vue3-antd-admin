import { RouteMeta } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean;
    // requiresAuth?: boolean;
    // requiresCom?: boolean;
  }
}
