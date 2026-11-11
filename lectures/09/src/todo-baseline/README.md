# Todo baseline

From this directory:

```sh
docker compose up --build
```

Open https://localhost/. HTTPS and HSTS are enabled; HTTP/3 is disabled.

Docker generates `certs/localhost.crt` and its key if either is missing, and reuses them otherwise. No mkcert installation is needed.

Once, import `certs/ca/root.crt` into your OS/browser's trusted certificate store (macOS: Keychain Access → import → trust for SSL). Docker cannot install browser trust on your host.

Certificates cover only `localhost`. Keep `certs/` out of Git. To renew, remove `certs/localhost.crt`, then run `docker compose up --build --force-recreate`.

Browser caching is disabled for frontend files (`Cache-Control: no-store`).

Application source and certificate-generation code live in `../todo-shared`. Stop the other app before starting this one.
