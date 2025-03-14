import type { App, Directive, DirectiveBinding } from 'vue';
import { useUserStore } from '@/stores/user';

function isAuth(el: Element, binding: any) {
  const { hasRoles } = useUserStore();

  const value = binding.value;
  if (!value) return;
  if (!hasRoles(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
};

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
}

export default authDirective;
