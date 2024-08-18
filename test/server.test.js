const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

const mockUser = {
    username: 'Clark Kent',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    roles: ['user'],
    number: '9876543210',
    gender: 'Male'
};

let token = '';

tap.test('POST /users/register', async (t) => {
    const response = await server.post('/users/register').send(mockUser);
    t.equal(response.status, 201, 'Expected status code 200 for successful registration');
    t.end();
});

tap.test('POST /users/register with missing email', async (t) => {
    const response = await server.post('/users/register').send({
        username: mockUser.username,
        password: mockUser.password
    });
    t.equal(response.status, 400, 'Expected status code 400 for validation failure due to missing email');
    t.end();
});

tap.test('POST /users/login', async (t) => { 
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});


tap.teardown(() => {
    process.exit(0);
});
