# Minimal WebTransport examples

Two independent echo examples, with a shared dependency install and local server setup:

- `reliable-streams/app.mjs` and `reliable-streams/static/script.mjs`
- `unreliable-datagrams/app.mjs` and `unreliable-datagrams/static/script.mjs`

Each page connects automatically and contains only an input, a Send button,
and the echoed text. Errors appear in the browser or server console. Reload
the page to reconnect. These are teaching examples, without retry logic or a
connection-management UI.

## Run

Use Node 20+, npm, OpenSSL, and a browser supporting WebTransport certificate
hashes (tested with Chrome). From this directory:

```sh
npm ci
npm run cert
npm run start:streams
```

Open **http://127.0.0.1:3000**. To try datagrams, stop the server with Ctrl+C:

```sh
npm run start:datagrams
```

Reload the page. Run one example at a time: both use TCP port 3000 for the page
and UDP port 4433 for WebTransport. `npm start` also starts the stream example.

## What to show

**Reliable streams:** each submission opens a bidirectional byte stream.
The server echoes its bytes. The client reads while writing, then closes the
sending side. EOF is the message boundary in this example; one write is not
necessarily one read. Different streams are handled independently.

**Unreliable datagrams:** each submission sends one bounded message. The server
echoes received datagrams. Delivery and ordering are not guaranteed, even when
`write()` succeeds. On localhost they will usually all arrive. The client checks
the byte length against `maxDatagramSize`.

## Shared setup

`server.mjs` serves the page, publishes the certificate hash, checks the request
origin, and starts the HTTP/3 server. The transport-specific teaching code is
in the two example folders. The Node library uses `datagrams.createWritable()`;
the browser API uses `datagrams.writable`.

`generate-certificate.mjs` creates a local certificate valid for 13 days. Run
`npm run cert` again after expiry, restart the server, and reload the page.
Generated keys and certificates are ignored by Git. Use the exact loopback URL
above; other origins are rejected. Production needs HTTPS, appropriate
certificates, authentication, and resource limits.
