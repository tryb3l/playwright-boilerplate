"use strict";

const { test, expect } = require("@playwright/test");

test.describe.parallel("POST /users API tests", () => {
  let getUsersResponseBody;

  test.beforeEach(async ({ request }) => {
    // Arrange
    const url = `/users?page=1`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    getUsersResponseBody = await response.json();
  });

  test("should create a new user with status 201", async ({ request }) => {
    // Arrange
    const url = `/users`;

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

    const responseBody = await response.json();
    expect(responseBody.first_name).toBe("Andrew");
    expect(responseBody.last_name).toBe("Test");
    expect(responseBody.id).not.toBeUndefined();
    expect(responseBody.id).toBe(233);
    expect(responseBody.createdAt).not.toBeUndefined();
    // Write response body to console
    console.log(responseBody);
  });

  test.skip("should return status 400 for invalid user data", async ({
    request,
  }) => {
    // Arrange
    const url = `/users`;

    // Act
    const response = await request.post(url, {
      data: {},
    });

    // Assert
    expect(response.status()).toBe(400);
  });
});
