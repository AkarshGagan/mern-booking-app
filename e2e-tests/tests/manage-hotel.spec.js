import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the signin button
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.locator("[name=email]").fill("akarshgagan@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Login Success")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel 1");
  await page.locator('[name="city"]').fill("Test City 1");
  await page.locator('[name="country"]').fill("Test Country 1");
  await page.locator('[name="description"]').fill("Test Description 1");
  await page.locator('[name="pricePerNight"]').fill("150");
  await page.selectOption('select[name="starRating"]', "4");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  //await expect(page.getByText("Hotel-Saved")).toBeVisible();
});
