import { Page, expect } from "@playwright/test"

export class ShoppingCartPage {
    readonly page: Page
    readonly frame: string
    readonly url: string
    readonly title: string
    readonly couponCode: string
    readonly codeInput: string
    readonly couponCodes: string[] = ['Dominick Harrison', 'John Doe', 'Jane Doe', 'Albert Einstein']
    readonly apply: string
    readonly couponAppliedMessage: string

    constructor(page: Page) {
        this.page = page
        this.url = "https://demo.mention-me.com/api-demo/v2/1stdibs/demo/referee"
        this.title = "Mention Me demo"
        this.codeInput = 'input[name="coupon"]'
        this.couponAppliedMessage = 'text=Coupon applied'
        this.apply = "text=Apply"
        this.frame = '#mm-demo-iframe'
    }

    async goto() {
        await this.page.goto(this.url)
    }

    async verifyPageTitle() {
        const title = await this.page.title()
        expect(title).toBe(this.title)
    }

    async enterCouponCode() {
        await this.page.frameLocator(this.frame).locator(this.codeInput).click();
        await this.page.frameLocator(this.frame).locator(this.codeInput).fill(this.couponCodes[0]);
        await this.page.frameLocator(this.frame).locator(this.apply).click();
    }

    async verifyCouponCode() {
        const couponAppliedMessage = this.page.frameLocator(this.frame).locator(this.couponAppliedMessage);
        const text = await couponAppliedMessage.innerText()

        await expect(couponAppliedMessage).toBeVisible()
        expect(text).toBe("Coupon applied")
    }



}

