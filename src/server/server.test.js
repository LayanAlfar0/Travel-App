const request = require('supertest');
const server = require('./server'); // Import the server instance

describe('GET /', () => {
    let testServer;

    // Start the server before running the tests
    beforeAll((done) => {
        testServer = server.listen(done);
    });

    // Close the server after the tests are done
    afterAll((done) => {
        testServer.close(done);
    });

    it('should respond with the index.html file', async () => {
        const response = await request(testServer).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('text/html');
        expect(response.text).toMatch(/<html>/i); // Ensures that HTML content is returned
    });
});
