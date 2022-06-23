# Playwright Testing Framework
This framework is designed to demonstrate Playwright by testing a demo ecommerce application - MentionMe's demo application utilises the ability to share a referral to a brand by name. 



## Installation
To get the framework installed, just follow the instructions below in your local terminal

```sh

git clone https://github.com/emcakmak/PlaywrightTestingFramework.git
cd PlaywrightTestingFramework/
npm install 

```



## Running Tests
Once you have installed the framework, you can get the tests running by either running the tests in headless or headed mode

```sh

npm run test-headless

npm run test-headed

```



## Reporting
You can locally generate HTML report files by running the command below

```sh

npm run report

```


## Playwright
Playwright enables reliable end-to-end testing for modern web apps. It is used in this project as it provides support for a multitude of modern rendering engines including Chromium, WebKit, and Firefox. it also has native mobile emulation of Google Chrome for Android and Mobile Safari. 

The below is taken from the playwright.config.ts file in the project. This emualates the viewport and engine of Chromium on a desktop and the Safari browser on an iPhone 12 Pro


```js
projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12 Pro'],
      },
    },
  ],
```


## Page Object Model
The Page Object Model is a common design pattern that introduces abstractions over web app pages to simplify interactions with them in multiple tests. In this example I have created a Shopping Cart 'page' which contains the necessary selectors to access web elements, as well as the associated methods which are called in the test spec files. For example, see the method below:



```js

const shoppingCartPage = new ShoppingCartPage(page)
await shoppingCartPage.verifyCouponCode()

```

The shopping cart page is instantiated, and Playwright's [Page](https://playwright.dev/docs/test-pom) object is passed. This allows us to reference the method to verify that the coupon code has been successfully applied.




## Test Fixtures
In Playwright, you can create custom fixtures which:
- can encapsulate setup and teardown
- are reusable between test files
- provide flexibility

For example, I have created a shopping cart fixture which allows the tester to write more simplified, self-contained code. It eliminates the need to instantiate a page object, as it is taken care of by Playwright at the moment of test execution:


```js

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



```

Here, we are extending Playwright's test fixture's base functionality and adding in methods exclusive to the shopping cart page. We can then use this fixture in our test spec file like so:



```js

import { shoppingCart } from '../fixtures/shoppingCartFixture'


shoppingCart('Apply coupon and verify its success', async ({ shoppingCartPage }) => {
    await shoppingCartPage.goto()
    await shoppingCartPage.verifyPageTitle()
    await shoppingCartPage.enterCouponCode()
    await shoppingCartPage.verifyCouponCode()
})

```

## CI/CD
The test.yml file contains the instructions required to install all the necessary dependencies and also run the tests. The workflow is set up using Github Actions, which is a continuous integration and continuous deployment platform that helps automate the execution of the tests. It is currently configured to run every day at 5am, Mon-Fri. It will also trigger on push and pull events on the main branch.
