// Pin the local certificate; a publicly trusted certificate needs no hash.
const hash = await fetch('/certificate-hash').then(response => response.json());
const transport = new WebTransport('https://127.0.0.1:4433/echo', {
  serverCertificateHashes: [{ algorithm: 'sha-256', value: new Uint8Array(hash) }],
});
transport.closed.catch(console.error);
await transport.ready;
document.querySelector('button').disabled = false;

document.querySelector('form').onsubmit = async event => {
  event.preventDefault();
  try {
    const stream = await transport.createBidirectionalStream();
    const writer = stream.writable.getWriter();
    // Start reading immediately. EOF marks the end of our echoed message.
    const reply = new Response(stream.readable).text();
    const send = (async () => {
      await writer.write(new TextEncoder().encode(document.querySelector('input').value));
      await writer.close(); // End this stream's sending side, not the session.
      writer.releaseLock();
    })();
    const [text] = await Promise.all([reply, send]);
    document.querySelector('#messages').textContent += text + '\n';
  } catch (error) {
    console.error(error);
  }
};
