import { test } from '@playwright/test'
import { Signup } from '../pages/signup'

test.describe("Registering a new user", async () => {
    test('Creating a new user by filling in the sign up form', async ({ page }) => {
        const signup = new Signup(page)
        await signup.goto()
        await signup.fillInForm()
        await signup.submitForm()
    })
})