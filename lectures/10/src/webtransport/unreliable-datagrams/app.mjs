import { startServer } from '../server.mjs';

const sessions = await startServer(new URL('./static/', import.meta.url));
for await (const session of sessions) {
  session.closed.catch(console.error);
  echo(session).catch(console.error);
}

async function echo(session) {
  await session.ready;
  const writer = session.datagrams.createWritable().getWriter();
  try {
    for await (const bytes of session.datagrams.readable) {
      await writer.write(bytes);
    }
  } finally {
    writer.releaseLock();
  }
}
