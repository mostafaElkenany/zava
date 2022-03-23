const request = require("supertest");
const app = require("../app");
const db = require("../models/index");

const { Truck, Parcel } = db;

describe('test truck load service endpoints', () => {

  test("should create a new truck", async () => {
    const response = await request(app)
      .post("/api/trucks")
      .send({ licenseNumber: "Test321" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("newTruck");
  });

  test("should create a new parcel", async () => {
    const response = await request(app)
      .post("/api/parcels")
      .send({ weight: 99 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("newParcel");
  });

  test("should get all trucks", async () => {
    const response = await request(app).get("/api/trucks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array)
  });

  test("should get all parcels", async () => {
    const response = await request(app).get("/api/parcels");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array)
  });

  test("should receive bad request weight is required", async () => {
    const response = await request(app)
      .post("/api/parcels")
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
        error: "Weight is required",
      })
    )
  });

  test("should load truck with parcel", async () => {
    const truck = await Truck.findOne({ raw: true });
    const parcel = await Parcel.findOne({ raw: true });
    const response = await request(app)
      .post(`/api/trucks/${truck.id}/load`)
      .send({ parcelIds: [parcel.id] });
    expect(response.statusCode).toBe(200);
  });

  test("should receive bad request truck not found", async () => {
    const parcel = await Parcel.findOne({ raw: true });
    const response = await request(app)
      .post("/api/trucks/0/load")
      .send({ parcelIds: [parcel.id] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
        error: "truck not found",
      })
    )
  });

  test("should receive bad request parcels not found or loaded in another truck", async () => {
    const truck = await Truck.findOne({ raw: true });
    const response = await request(app)
      .post(`/api/trucks/${truck.id}/load`)
      .send({ parcelIds: [0] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
        error: "parcels not found or loaded in another truck",
      })
    )
  });

  test("should unload truck", async () => {
    const truck = await Truck.findOne({ raw: true });
    const parcel = await Parcel.findOne({ raw: true });
    const response = await request(app)
      .post(`/api/trucks/${truck.id}/unload`)
      .send({ parcelIds: [parcel.id] });
    expect(response.statusCode).toBe(200);
  });

  test("should receive bad request parcels not found in truck", async () => {
    const truck = await Truck.findOne({ raw: true });
    const response = await request(app)
      .post(`/api/trucks/${truck.id}/unload`)
      .send({ parcelIds: [0] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
        error: "parcels not found in truck",
      })
    )
  });

  test("should get truck weight and number of parcels", async () => {
    const truck = await Truck.findOne({ raw: true });
    const response = await request(app)
      .get(`/api/trucks/${truck.id}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        truckWeight: expect.any(Number),
        parcelsNumber: expect.any(Number),
      })
    )
  });


  test("should receive bad request truck not found", async () => {
    const response = await request(app)
      .get("/api/trucks/0")
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
        error: "truck not found",
      })
    )
  });


})