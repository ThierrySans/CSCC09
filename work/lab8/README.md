---
layout: default
permalink: /work/lab8/
---

# Lab 8 - Agentic AI

In this lab, you will create an MCP server to connect an Agentic AI to your microblog app. The goal is to use an LLM chat to list, add, downvote, upvote and delete messages. 

## Starter code: How the backend was refactored

Originally, `rest.mjs` handled HTTP requests and contained the application logic.
The refactor separates how clients communicate with the app from what the app
does. There are now two servers that call the same core functions:

| File       | Responsibility                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rest.mjs` | Serves the browser app and REST routes on port `3000`. Handles HTTP requests, responses, and browser login sessions.                                        |
| `mcp.mjs`  | Serves MCP tools at `http://127.0.0.1:3001/mcp`. Authenticates AI clients using tokens and translates tool calls into core function calls.                  |
| `core.mjs` | Implements account creation, password checking, messages, voting, deletion, and token management. It does not handle HTTP requests or MCP protocol objects. |
| `db.mjs`   | Opens SQLite and defines the shared tables.                                                                                                                 |

For example, clicking **Post your message** in the browser sends a request to
REST, while asking an AI to post invokes an MCP tool. Both servers call
`core.addMessage`, so both apply the same validation and save messages in the same
database. Neither server needs to call the other server.

The database was migrate from NeDB to SQLlite to enable two processes to access the same database concurrently. 
SQLite uses WAL mode and a write-lock timeout to coordinate access across processes.
Both processes can run at the same time and share `db/microblog.sqlite`. 

## How AI tokens work

The browser uses your username and password to establish a login session. An AI
client instead authenticates with a personal access token that you create while
signed in to the app. This lets the client act as you without receiving your
password or browser session cookie.

1. The app generates a random token beginning with `mb_` and displays it once.
2. The database stores its SHA-256 hash, owner, name, expiration date, and
   revocation status. It does not store the original token secret.
3. You configure the AI client to send the secret on every MCP request:

   ```text
   Authorization: Bearer mb_your_token
   ```

4. The MCP server hashes the supplied token, looks it up, and checks that it has
   not expired or been revoked. Its owner becomes the user for that request.
   Missing or invalid tokens receive HTTP `401`.

One MCP server serves many users, each with their own token. A token allows
reading, posting, and voting on messages, deleting its owner's messages, and
managing its owner's tokens. It cannot authorize deletion of someone else's
messages. Keep it private: anyone holding it can perform these actions as you.

You can create several named tokens for different clients and revoke them
individually on **AI access**. Revocation takes effect on the next MCP request.
If you lose a token, create a replacement; its secret cannot be retrieved later.

## Before using AI: prepare the app

### 1. Start the REST server

Use Node.js 22.16 or later. From the project root, install dependencies and start
REST:

```sh
npm install
npm start
```

Leave this terminal running. Open [Microblog](http://localhost:3000) in your browser. The MCP server is not needed for these browser steps.

### 2. Create an account and some messages

1. On [the login page](http://localhost:3000/login.html), enter a username and
   password and click **Sign up**.
2. Return to the login page and **Sign in** with those credentials. Signing up
   creates the account; signing in starts your browser session.
3. On the main page, type a message and click **Post your message**.
4. Post two or three messages, such as "Hello, Microblog!" and "I am learning
   about MCP." These give the AI something to read and interact with later.

### 3. Create an AI token

1. While signed in, click **AI access** in the header, or open
   [the AI access page](http://localhost:3000/ai.html).
2. Set **Token name** to `Antigravity` and choose **Expires in days**
   (for example, `30`). Click **Create token**.
3. Copy the complete `mb_...` value under **Copy your token now**. It is shown
   only once. You will use it in the Antigravity configuration below.

Each student should create their own account, messages, and token, even when
connecting to the same MCP server.

## Using the MCP server with Google Antigravity CLI

### 1. Install Antigravity CLI

On **macOS or Linux**, run the official installer:

```sh
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

On **Windows (PowerShell)**, run:

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

Open a new terminal and check the installation:

```sh
agy --version
```

If `agy` is not found on macOS/Linux, add its default installation directory to
this terminal's path:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

The CLI command is `agy`. Follow Google's
[installation guide](https://antigravity.google/docs/getting-started?tab=cli)
for other platforms or installation problems.

### 2. Start the MCP server

After completing **Before using AI: prepare the app**, keep REST running and
open a second terminal in the project root:

```sh
npm run mcp
```

Leave this terminal running too. REST serves the browser on port `3000`; MCP
accepts AI tool calls on port `3001` at `/mcp`. Have the token you created through
**AI access** ready for the next step.

### 3. Configure the MCP connection

Use the repository's [mcp_config.json](mcp_config.json) as a template. Its filename
is `mcp_config.json`, not `mcp_server.json`. From the project root, copy it into
Antigravity's workspace configuration directory:

```sh
mkdir -p .agents
cp -i mcp_config.json .agents/mcp_config.json
```

If the destination already exists, merge the `microblog` entry into its
`mcpServers` object instead of replacing your other server definitions.

Edit `.agents/mcp_config.json` and replace `YOUR_MICROBLOG_TOKEN` with the complete
token copied from the app:

```json
{
  "mcpServers": {
    "microblog": {
      "serverUrl": "http://127.0.0.1:3001/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MICROBLOG_TOKEN"
      }
    }
  }
}
```

Keep the `Bearer ` prefix exactly once. Keep your populated `.agents/mcp_config.json`
private; the repository template should contain only a placeholder.

The root template is not loaded automatically: Antigravity reads
`.agents/mcp_config.json` for this workspace or `~/.gemini/config/mcp_config.json`
for all workspaces. The `serverUrl` must include `/mcp`. This connects to the
server started by `npm run mcp`; it does not start the backend itself.
See Google's [MCP configuration guide](https://antigravity.google/docs/mcp).

### 4. Connect and try the tools

In a third terminal, from this project's root directory, launch:

```sh
agy
```

Complete the first-run setup and authentication prompts. Signing in to Google
allows you to use Antigravity; the Microblog token separately grants access to
the app.

Inside Antigravity, enter `/mcp` to inspect the `microblog` connection. Reload the
configuration there after changes, or restart `agy`. Once connected, try:

> Use the microblog MCP tool to show the latest messages. 

Review any tool approval prompt and inspect the returned result. Then try the
examples below. Refresh the browser app after posting to see your message.

### ToDo: complete the MCP server

So far, our MCP server can only list the Microblog messages. Complete `mcp.msj` to be able to add, upvote, downvote and delete messages from Microblog.

While you are testing, refresh the browser app after a write to see the result. Antigravity should use the tool's returned data when reporting success; if a call fails, ask it to explain the error instead of assuming the action completed.

Below you will find some prompt examples that want our MCP server to support. 

To keep the agent focused on the running app, start with:

> Use the microblog MCP tools for these requests. 

**Read the latest messages**

> Show the latest five Microblog messages, including their IDs, authors, content,
> and vote counts.

**Read an older page**:

> Fetch page 1 with a limit of 5 and show those messages. Page 0 is the latest page.

**Post a message**:

> Post this exact message to Microblog: "Hello from Antigravity! I am testing MCP."
> Show the message ID returned by the tool.

**Upvote a message**:

> Upvote the message with ID MESSAGE_ID once, then show its updated vote counts.

**Downvote a message**:

> Downvote the message with ID MESSAGE_ID once, then show its updated vote counts.

Replace `MESSAGE_ID` with an actual ID.
Each vote call adds one vote; it does not toggle or undo a previous vote.

**Delete one of your messages**:

> Delete my message with ID MESSAGE_ID. Show which message was deleted.

The server rejects attempts to delete another user's message. Posting and deletion
use the account associated with your configured token.

### Troubleshooting and replacing a token

- **Not Found during initialize:** use `http://127.0.0.1:3001/mcp`, including
  `/mcp`. Port `3000` serves the browser app.
- **Connection refused:** keep `npm run mcp` running and check its port.
- **HTTP 401:** check the complete token and the single `Bearer ` prefix in
  `.agents/mcp_config.json`. Expired or revoked tokens cannot connect.
- **No tools:** launch `agy` from this project root and inspect `/mcp`. A config
  left only at the repository root is not loaded automatically.
- **Lost or expired token:** create a replacement through **AI access**, update
  the private configuration, then reload the connection. Click **Revoke** under
  **Your tokens** to disable an old token; its next MCP request will be denied.

For an instructor-hosted server, use their MCP URL and create your token through
their browser app. `127.0.0.1` refers to the computer running Antigravity.