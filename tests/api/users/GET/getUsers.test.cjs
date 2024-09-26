"use strict";

const { test, expect } = require("@playwright/test");

test.describe.parallel("GET /users API tests", () => {
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

  test("should return correct pagination details", async () => {
    // Assert
    expect(getUsersResponseBody.page).toBe(1);
    expect(getUsersResponseBody.per_page).toBe(6);
    expect(getUsersResponseBody.total).toBe(12);
    expect(getUsersResponseBody.total_pages).toBe(2);
    expect(getUsersResponseBody.data.length).toBe(6);
  });

  test("should return user details by ID", async ({ request }) => {
    // Arrange
    const userId = getUsersResponseBody.data[0].id;
    const url = `/users/${userId}`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.data).not.toBeUndefined();
    expect(responseBody.data.id).toBe(userId);
    expect(responseBody.data.email).toBe(getUsersResponseBody.data[0].email);
    expect(responseBody.data.first_name).toBe(
      getUsersResponseBody.data[0].first_name,
    );
  });
});
