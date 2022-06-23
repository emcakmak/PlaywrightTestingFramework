import { test } from '@playwright/test'
import { ShoppingCartPage } from '../pages/shoppingCart'

test.describe("Share a referral to a brand by name - 'share by name' feature", async () => {
    test('Share by name feature', async ({ page }) => {
        const shoppingCartPage = new ShoppingCartPage(page)
        await shoppingCartPage.goto()
        await shoppingCartPage.verifyPageTitle()
        await shoppingCartPage.enterCouponCode()
        await shoppingCartPage.verifyCouponCode()
    })
})