const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

const mockUser = {
  username: "Clark Kent",
  email: "clark@superman.com",
  password: "Krypt()n8",
  roles: ["admin"],
  number: "9876543210",
  gender: "Male",
};

const registerBody = {
  email: "clark@superman.com",
  name: "Clark Kent",
};
const mockEvent = {
  eventtitle: "Mongoose Workshop",
  description: "A workshop to learn about Mongoose and MongoDB.",
  date: "2024-08-20",
  location: "Chennai",
  participants: [],
};

const updateMockEvent = {
  eventtitle: "Tech Conference Updated1",
  description: "A conference on the latest in technology.",
  date: "2024-09-01",
  location: "Banglore Bhuwalka Icon Office1",
  participants: [],
};

let token = "";

//Auth Tests
tap.test("POST /users/register", async (t) => {
  const response = await server.post("/users/register").send(mockUser);
  t.equal(
    response.status,
    201,
    "Expected status code 200 for successful registration"
  );
  t.end();
});

tap.test("POST /users/register with missing email", async (t) => {
  const response = await server.post("/users/register").send({
    username: mockUser.username,
    password: mockUser.password,
  });
  t.equal(
    response.status,
    400,
    "Expected status code 400 for validation failure due to missing email"
  );
  t.end();
});

tap.test("POST /users/login", async (t) => {
  const response = await server.post("/users/login").send({
    email: mockUser.email,
    password: mockUser.password,
  });
  t.equal(response.status, 200);
  t.hasOwnProp(response.body, "token");
  token = response.body.token;
  t.end();
});

tap.test("POST /users/login with wrong password", async (t) => {
  const response = await server.post("/users/login").send({
    email: mockUser.email,
    password: "wrongpassword",
  });
  t.equal(response.status, 401);
  t.end();
});

//CRUD Tests for Event Organisers

//CREATE EVENTS
tap.test("POST /events/create", async (t) => {
  const response = await server
    .post("/events/create")
    .set("Authorization", `Bearer ${token}`)
    .send(mockEvent);
  t.equal(response.status, 201);
  t.hasOwnProp(response.body, "message");
  t.end();
});

tap.test("POST /events/create without token", async (t) => {
  const response = await server.post("/events/create").send(mockEvent);
  t.equal(response.status, 401);
  t.end();
});

//READ EVENTS
tap.test("GET /events", async (t) => {
  const response = await server
    .get("/events")
    .set("Authorization", `Bearer ${token}`);
  t.equal(response.status, 200);
  t.hasOwnProp(response.body, "message");
  t.end();
});

tap.test("GET /events", async (t) => {
  const response = await server.get("/events");
  t.equal(response.status, 401);
  t.end();
});

//UPDATE EVENTS
tap.test("PUT /events/update/:id", async (t) => {
  const id = "66c209094d921fef64b6eae7";
  const response = await server
    .put(`/events/update/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updateMockEvent);
  console.log(response.body);
  t.equal(response.status, 200);
  t.hasOwnProp(response.body, "message");
  t.end();
});

tap.test("PUT /events/update/:id with invalid id", async (t) => {
  const id = "66c209094d921fef64b6eae8";
  const response = await server
    .put(`/events/update/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updateMockEvent);
  console.log(response.body);
  t.equal(response.status, 404);
  t.hasOwnProp(response.body, "message");
  t.end();
});

tap.test("PUT /events/update/:id without token", async (t) => {
  const id = "66c209094d921fef64b6eae7";
  const response = await server
    .put(`/events/update/${id}`)
    .send(updateMockEvent);
  t.equal(response.status, 401);
  t.hasOwnProp(response.body, "message");
  t.end();
});

//DELETE EVENT
/*
tap.test('PUT /events/delete/:id', async (t) => {
    const id = '66c1731fe059bd7ec1c0ba70';
    const response = await server.delete(`/events/delete/${id}`).set('Authorization', `Bearer ${token}`);
    console.log(response.body);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'message');
    t.end();
});

tap.test('PUT /events/delete/:id without token', async (t) => {
    const id = '66c1731fe059bd7ec1c0ba70';
    const response = await server.delete(`/events/delete/${id}`);
    console.log(response.body);
    t.equal(response.status, 401);
    t.hasOwnProp(response.body, 'message');
    t.end();
}); */

//REGISTER USER FOR AN EVENT
tap.test("POST /events/:id/register", async (t) => {
  const id = "66c209094d921fef64b6eae7";
  const response = await server
    .post(`/events/${id}/register`)
    .set("Authorization", `Bearer ${token}`)
    .send(registerBody);
    console.log(response.body);
  t.equal(response.status, 200);
  t.hasOwnProp(response.body, "message");
  t.end();
});

tap.teardown(() => {
  process.exit(0);
});
