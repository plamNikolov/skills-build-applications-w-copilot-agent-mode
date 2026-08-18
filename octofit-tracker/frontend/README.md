# Octofit Tracker Frontend

This React app connects to the Octofit API through the GitHub Codespaces forwarding URL.

## Required environment variable

Before running the app locally or in a Codespace, define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000` instead of creating a broken `https://undefined-8000...` URL.

The app uses the following pattern for requests:

```js
const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
```

## API endpoints

- Activities: `/api/activities/`
- Leaderboard: `/api/leaderboard/`
- Teams: `/api/teams/`
- Users: `/api/users/`
- Workouts: `/api/workouts/`
