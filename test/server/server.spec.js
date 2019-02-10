import request from 'supertest';
import server from '../../server/server';

describe('Server', () => {
  afterEach(() => {
    server.close();
  });

  it('should responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should responds to /estimate', (done) => {
    request(server)
      .get('/estimate')
      .expect(200, done);
  });

  it('should send 404 for everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
