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

  test("should return correct pagination details for page 1", async () => {
    // Assert
    expect(getUsersResponseBody.page).toBe(1);
    expect(getUsersResponseBody.per_page).toBe(6);
    expect(getUsersResponseBody.total).toBe(12);
    expect(getUsersResponseBody.total_pages).toBe(2);
    expect(getUsersResponseBody.data.length).toBe(6);
  });

  test("should return user details by ID for page 1", async ({ request }) => {
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

  test("should return correct pagination details for page 2", async ({
    request,
  }) => {
    // Arrange
    const url = `/users?page=2`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.per_page).toBe(6);
    expect(responseBody.total).toBe(12);
    expect(responseBody.total_pages).toBe(2);
    expect(responseBody.data.length).toBe(6);
  });

  test("should return correct user details for page 2", async ({ request }) => {
    // Arrange
    const url = `/users?page=2`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const expectedUsers = [
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
      {
        id: 8,
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
        avatar: "https://reqres.in/img/faces/8-image.jpg",
      },
      {
        id: 9,
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
      },
      {
        id: 10,
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://reqres.in/img/faces/10-image.jpg",
      },
      {
        id: 11,
        email: "george.edwards@reqres.in",
        first_name: "George",
        last_name: "Edwards",
        avatar: "https://reqres.in/img/faces/11-image.jpg",
      },
      {
        id: 12,
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        avatar: "https://reqres.in/img/faces/12-image.jpg",
      },
    ];

    expect(responseBody.data).toEqual(expectedUsers);
  });

  test("should return support information", async ({ request }) => {
    // Arrange
    const url = `/users?page=2`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.support.url).toBe("https://reqres.in/#support-heading");
    expect(responseBody.support.text).toBe(
      "To keep ReqRes free, contributions towards server costs are appreciated!",
    );
  });
});
