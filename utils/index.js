export { promisify, request, BASE_URL } from './promisify';
export { loginController } from './login';
export function demoToast() {
  tt.showToast({
    title: '仅用作示意展示',
    icon: 'none',
  });
}
