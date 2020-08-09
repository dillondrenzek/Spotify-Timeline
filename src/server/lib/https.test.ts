import https from 'https';
import { Https } from './https';



describe('Https', () => {
  let subject: Https;
  let httpsRequest = jest.fn();

  jest.mock('https', () => {
    return {
      request: httpsRequest
    }
  })

  beforeEach(() => {
    subject = new Https();
  });

  it('should be called properly', async () => {

    console.log('test request', https.request);

    await subject.request('/test/url', { method: 'GET' })

    expect(httpsRequest).toBeCalledWith('/test/url', { method: 'GET' });
  });
});