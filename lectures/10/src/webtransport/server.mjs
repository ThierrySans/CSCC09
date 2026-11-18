// Shared local setup. The echo handlers live in each example's app.mjs.
import { createHash, randomBytes, X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Http3Server } from '@fails-components/webtransport';

export async function startServer(staticDirectory) {
  // Run npm run cert first. These certificates expire after 13 days.
  const cert = readFileSync(new URL('./certs/cert.pem', import.meta.url), 'utf8');
  const privKey = readFileSync(new URL('./certs/key.pem', import.meta.url), 'utf8');
  const hash = createHash('sha256').update(new X509Certificate(cert).raw).digest();

  // The page uses HTTP/TCP; WebTransport uses a separate HTTP/3/UDP server.
  const app = express();
  app.get('/certificate-hash', (req, res) => {
    res.set('Cache-Control', 'no-store').json([...hash]);
  });
  app.use(express.static(fileURLToPath(staticDirectory)));

  const server = new Http3Server({
    host: '127.0.0.1', port: 4433,
    secret: randomBytes(32).toString('hex'), cert, privKey,
  });
  server.setRequestCallback(async ({ header }) => ({
    path: header[':path'],
    status: header[':path'] !== '/echo' ? 404
      : header.origin !== 'http://127.0.0.1:3000' ? 403 : 200,
  }));
  const sessions = server.sessionStream('/echo');
  server.startServer();
  await server.ready;
  app.listen(3000, '127.0.0.1', () => console.log('Open http://127.0.0.1:3000'));
  return sessions;
}
