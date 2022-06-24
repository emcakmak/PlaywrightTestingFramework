// This test uses the shopping cart fixture
import { shoppingCart } from '../fixtures/shoppingCartFixture'

shoppingCart('Apply coupon and verify its success', async ({ shoppingCartPage }) => {
    await shoppingCartPage.goto()
    await shoppingCartPage.verifyPageTitle()
    await shoppingCartPage.enterCouponCode()
    await shoppingCartPage.verifyCouponCode()
})