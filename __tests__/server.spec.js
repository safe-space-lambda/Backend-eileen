const request = require('supertest');
const server = require('../api/server');

describe('server.js tests', () => {
    describe('POST /api/register endpoint', () => {
        beforeEach(() => {
            jest.setTimeout(10000);
          });
        
        it('should return an error if there is no username', async () => {
            const noUsername = { password: 'test', name: 'test' };

            let response = await request(server).post('/api/register/').send(noUsername);

            expect(response.body).toEqual({
                error: `Make sure to include a username and your name!`
            })
        });
        
        it('should return an error if there is no name', async () => {
            const noName = { password: 'test', username: 'test' };

            let response = await request(server).post('/api/register/').send(noName);

            expect(response.body).toEqual({
                error: `Make sure to include a username and your name!`
            })
        });
        
        it('should return an error if there is no password', async () => {
            const noPassword = { username: 'test', name: 'test' };

            let response = await request(server).post('/api/register/').send(noPassword);

            expect(response.body).toEqual({
                error: `Please include a password for registration.`
            })
        });
        
        it('should return an array of ids and status code of 201 on successful registration', async () => {
            const testUser = { username: 'test2', password: 'test', name: 'tester' };

            let response = await request(server).post('/api/register/').send(testUser);

            expect(response.body).toEqual([2]);
            expect(response.status).toBe(201);
        });
    });

    describe('POST /api/login endpoint', () => {
        it('should return an error if username was not suppied', async () => {
            const noUsername = { password: 'test'};

            let response = await request(server).post('/api/login').send(noUsername);

            expect(response.body).toEqual({ error: `Please include a username.` });
        });

        it('should return an error if no password was supplied', async () => {
            const noPassword = { username: 'test'};

            let response = await request(server).post('/api/login').send(noPassword);

            expect(response.body).toEqual({ error: `Please include a password.` });
        });

        it('should return an error if username or password is incorrect', async () => {
            const wrongCreds = { username: 'test', password:'test123' };

            let response = await request(server).post('/api/login').send(wrongCreds);

            expect(response.body).toEqual({  message: `Invalid username or password.` });
        });

        it('should return a status code of 200 if login successful', async () => {
            const creds = { username: 'test', password: 'test' };

            let response = await request(server).post('/api/login').send(creds);

            expect(response.status).toBe(200);
        });
    })
});