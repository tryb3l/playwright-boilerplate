import { test, expect } from "@playwright/test";
import { baseURL } from "../../playwright.config.ts";

test.describe.parallel("POST user tests", () => {
  let getUsersResponseBody: any;

  test.beforeEach(async ({ request }) => {
    // Arrange
    // baseURL is defined in api.config.ts
    const url = `${baseURL}/users?page=1`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    getUsersResponseBody = JSON.parse(await response.text());
  });

  test("POST user status 201", async ({ request }) => {
    // Arrange
    // baseURL is defined in api.config.ts
    const url = `${baseURL}/users`;

    // Act
    const response = await request.post(url, {
      data: {
        email: "test.andrew@example.com",
        first_name: "Andrew",
        last_name: "Test",
        password: "supersecret",
        id: 233,
      },
    });

    // Assert
    expect(response.status()).toBe(201);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.first_name).toBe("Andrew");
    expect(responseBody.last_name).toBe("Test");
    expect(responseBody.id).not.toBeUndefined();
    expect(responseBody.id).toBe(233);
    expect(responseBody.createdAt).not.toBeUndefined();
    //write response body to console
    console.log(responseBody);
  });

  test.skip("POST user status 400", async ({ request }) => {
    // Arrange
    // baseURL is defined in api.config.ts
    const url = `${baseURL}/users`;

    // Act
    const response = await request.post(url, {
      data: {},
    });

    // Assert
    expect(response.status()).toBe(400);
  });
});
