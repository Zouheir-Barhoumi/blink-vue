import request from "supertest";
import app from "../app.mjs";
import User from "../models/users.mjs";

jest.mock("../models/users.mjs");
