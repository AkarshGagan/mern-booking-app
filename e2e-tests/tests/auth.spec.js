// @ts-check
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //get the signin button
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.locator("[name=email]").fill("akarshgagan@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Login Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const Email = `test_register_${
    Math.floor(Math.random() * 90000) + 1000
  }@test.com`;

  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: " Create an acoount now" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(Email);
  await page.locator("[name=password]").fill("password.123");
  await page.locator("[name=confirmPassword]").fill("password.123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
