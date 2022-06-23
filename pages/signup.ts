import { Page } from "@playwright/test"

export class Signup {
    readonly page: Page
    readonly url: string
    readonly frame: string
    readonly name: string
    readonly email: string
    readonly password: string
    readonly referredByFriend: string
    readonly register: string

    constructor(page: Page) {
        this.page = page
        this.url = "https://demo.mention-me.com/api-demo/v2/1stdibs/demo/referee/signup"
        this.frame = '#mm-demo-iframe'
        this.name = "input#name"
        this.email = "input#email"
        this.password = "input#password"
        this.referredByFriend = "a#mmLink"
        this.register = "button:has-text('Register')"
    }

    async goto() {
        await this.page.goto(this.url)
    }

    async generateRandomEmail() {
        const number = Math.floor(Math.random() * 1000)
        const email = `${number}.email@test.com`
        return email
    }

    async fillInForm() {
        await this.page.frameLocator(this.frame).locator(this.name).fill('John Doe');
        await this.page.frameLocator(this.frame).locator(this.email).fill(await this.generateRandomEmail());
        await this.page.frameLocator(this.frame).locator(this.password).fill('Pas5W0rd!');
    }

    async submitForm() {
        await this.page.frameLocator(this.frame).locator(this.register).click()
    }
}