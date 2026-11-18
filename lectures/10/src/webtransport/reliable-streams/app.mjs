import { startServer } from '../server.mjs';

const sessions = await startServer(new URL('./static/', import.meta.url));
for await (const session of sessions) {
  session.closed.catch(console.error);
  echo(session).catch(console.error);
}

async function echo(session) {
  await session.ready;
  for await (const stream of session.incomingBidirectionalStreams) {
    // Echo each stream independently; pipeTo respects backpressure.
    stream.readable.pipeTo(stream.writable).catch(console.error);
  }
}
