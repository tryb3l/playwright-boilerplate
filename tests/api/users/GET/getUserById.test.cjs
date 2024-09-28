"use strict";

const { test, expect } = require("@playwright/test");

test.describe.parallel("GET /users/:id API tests", () => {
  test("should return user details by ID", async ({ request }) => {
    // Arrange
    const userId = 2;
    const url = `/users/${userId}`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const expectedUser = {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    };

    expect(responseBody.data).toEqual(expectedUser);
  });

  test("should return support information", async ({ request }) => {
    // Arrange
    const userId = 2;
    const url = `/users/${userId}`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const expectedSupport = {
      url: "https://reqres.in/#support-heading",
      text: "To keep ReqRes free, contributions towards server costs are appreciated!",
    };

    expect(responseBody.support).toEqual(expectedSupport);
  });

  test("should return 404 for non-existent user", async ({ request }) => {
    // Arrange
    const userId = 9999; // Assuming this user ID does not exist
    const url = `/users/${userId}`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(404);
  });
});
