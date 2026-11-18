// Pin the local certificate; a publicly trusted certificate needs no hash.
const hash = await fetch('/certificate-hash').then(response => response.json());
const transport = new WebTransport('https://127.0.0.1:4433/echo', {
  serverCertificateHashes: [{ algorithm: 'sha-256', value: new Uint8Array(hash) }],
  requireUnreliable: true,
});
transport.closed.catch(console.error);
await transport.ready;
document.querySelector('button').disabled = false;

const writer = transport.datagrams.writable.getWriter();
document.querySelector('form').onsubmit = async event => {
  event.preventDefault();
  const bytes = new TextEncoder().encode(document.querySelector('input').value);
  if (bytes.byteLength > transport.datagrams.maxDatagramSize) {
    console.error('Message is too large for one datagram.');
    return;
  }
  // A successful write does not guarantee delivery.
  writer.write(bytes).catch(console.error);
};

const reader = transport.datagrams.readable.getReader();
try {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    document.querySelector('#messages').textContent += new TextDecoder().decode(value) + '\n';
  }
} finally {
  reader.releaseLock();
}
