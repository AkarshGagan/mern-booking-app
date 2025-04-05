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

  await page.locator('[name="name"]').fill("Hotel Blue");
  await page.locator('[name="city"]').fill("kanakapura");
  await page.locator('[name="country"]').fill("India");
  await page.locator('[name="description"]').fill("This is a new hotel");
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
  // await expect(page.getByText("Hotel-Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByText("Hotel Blue")).toBeVisible();
  await expect(page.getByText("This is a new hotel")).toBeVisible();
  await expect(page.getByText("kanakapura, India")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("£150 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("4 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(
    page.locator('role=link[name="Add Hotel"]').nth(0)
  ).toBeVisible();
});

test("should edit hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).click();
  await page.waitForSelector(`[name="name"]`, { state: "attached" });
  await expect(page.locator(`[name="name"]`)).toHaveValue("Hotel Blue Updated");
  await page.locator("[name=name]").fill("Hotel Blue");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();

  await page.reload();
  await expect(page.locator(`[name="name"]`)).toHaveValue("Hotel Blue");
});
