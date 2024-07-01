import request from "supertest";
import app from "../app.mjs";
import User from "../models/users.mjs";

/**
 * Mocks the `User` model from the `../models/users.mjs` module for testing purposes.
 * This allows us to control the behavior of the `User` model during tests without
 * interacting with the actual database.
 */
jest.mock("../models/users.mjs");

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const user = {
        username: "jestuser1",
        email: "jestuser1@email.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/auth/register", user)
        .send(user);

      expect(response.status).toBe(201);
      // expect(response.body.username).toBe(user.username);
      // expect(response.body.email).toBe(user.email);
    });
  });
});
