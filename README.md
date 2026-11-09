# SauceDemo Playwright practice

Small Playwright suite against https://www.saucedemo.com. I'm using it to practise
writing fast, focused tests and to keep a GitHub Actions setup I can reuse.

## Run it

```
npm install
npx playwright install chromium
npm test
```

## What's covered

- Checkout happy path (login, add to cart, finish order)
- Login failures: wrong password, locked-out user
- Sorting: price low to high, name Z to A
- Cart: removing an item updates the list and badge
- `problem_user`: logs in fine, but checkout form input is broken (asserted as a known bug)

Tests run in parallel on Chromium only, with images and fonts blocked to save time.
