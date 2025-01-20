import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        male: 'male/index.html',
        female: 'female/index.html',
        kids: 'kids/index.html',
        login: 'login/index.html',
        register: 'register/index.html',
        carrito: 'carrito/index.html',
        payment: 'payment/index.html',
        purchase: 'purchase/index.html',
        purchaseItem: 'purchase/item/index.html',
        us: 'us/index.html',
        users:'users/index.html',
        productsManage:'productsManage/index.html',
      }
    }
  }
});
