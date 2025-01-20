import { describe, it, vi, expect } from 'vitest';
import edit from '../../productsManage/edit';

describe('edit a product', async () => {
    it('debería edit correctamente un producto', async () => {
        const productId = 1
        const product = {
            name: 'corbata para hombre',
            price: 50,
            image_url: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/883157888_1/w=800,h=800,fit=pad',
            category: 'male'
        }

        const responseMuck = await edit(productId, product);
        const data = responseMuck[0]
        expect(data.id).toBe(productId);
    });
});