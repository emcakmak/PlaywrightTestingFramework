// Creating fixture for shopping cart page
import { test as base } from '@playwright/test';
import { ShoppingCartPage } from '../pages/shoppingCart';

// Extend basic test fixture.
export const shoppingCart = base.extend<{ shoppingCartPage: ShoppingCartPage }>({
    shoppingCartPage: async ({ page }, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await shoppingCartPage.goto();
        await shoppingCartPage.verifyPageTitle()
        await shoppingCartPage.enterCouponCode()
        await shoppingCartPage.verifyCouponCode()
        await use(shoppingCartPage);
        console.log('Using shopping cart test fixture')
    },
});
