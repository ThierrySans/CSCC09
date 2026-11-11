# Shared Todo source

- `frontend/`: HTML, CSS, JavaScript and images used by both apps.
- `backend/`: identical backend implementation for both apps.
- `tls/`: certificate-generation code; each app keeps its own certificates.

`todo-baseline` serves the frontend source directly. `todo-optimized` mounts it at `/build/src`, builds it with esbuild, and serves `todo-optimized/frontend/dist`.

Edit application code here, then run `docker compose up --build` from either deployment directory. Each deployment retains its own database and uploads.
