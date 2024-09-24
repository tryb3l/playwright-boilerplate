import { test, expect } from "@playwright/test";


test.describe.parallel("GET USERS tests", () => {
  let getUsersResponseBody: any;

  test.beforeEach(async ({ request }) => {
    // Arrange
    // baseURL is defined in api.config.ts
    const url = `/users?page=1`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    getUsersResponseBody = JSON.parse(await response.text());
  });

  test("GET users status 200 ", async ({ request }) => {
    // Assert
    expect(getUsersResponseBody.page).toBe(1);
    expect(getUsersResponseBody.per_page).toBe(6);
    expect(getUsersResponseBody.total).toBe(12);
    expect(getUsersResponseBody.total_pages).toBe(2);
    expect(getUsersResponseBody.data.length).toBe(6);
  });

  test("GET users by id  status 200", async ({ request }) => {
    // Arrange
    // baseURL is defined in api.config.ts
    const url = `${baseURL}/users/${getUsersResponseBody.data[0].id}`;

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.data).not.toBeUndefined();
    expect(responseBody.data.id).toBe(getUsersResponseBody.data[0].id);
    expect(responseBody.data.email).toBe(getUsersResponseBody.data[0].email);
    expect(responseBody.data.first_name).toBe(
      getUsersResponseBody.data[0].first_name,
    );
  });
});
