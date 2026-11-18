import { execFileSync } from 'node:child_process';
import { mkdirSync, chmodSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('./certs/', import.meta.url));
mkdirSync(directory, { recursive: true, mode: 0o700 });

// Certificate pinning in browsers requires a short-lived certificate (<= 14
// days). ECDSA P-256 is supported; do not use OpenSSL's default RSA key.
execFileSync('openssl', [
  'req', '-x509', '-newkey', 'ec', '-pkeyopt', 'ec_paramgen_curve:prime256v1',
  '-nodes', '-sha256', '-days', '13', '-subj', '/CN=localhost',
  '-keyout', `${directory}/key.pem`, '-out', `${directory}/cert.pem`,
], { stdio: 'inherit' });
chmodSync(`${directory}/key.pem`, 0o600);
console.log('Created a 13-day local certificate. Restart the server and reload the page.');
