# Kuwait Tourism App

A modern web application designed to promote tourism in Kuwait.
This project is for tourism in Kuwait.

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

### Backend
- **Framework:** [Django](https://www.djangoproject.com/)

## Project Structure

- `frontend/`: The Next.js application.
- `backend/`: The Django API.
- `nginx/`: Reverse proxy config for VPS-style deployment.

## Docker Deployment

This project now uses `nginx` as the public entrypoint:

- `nginx` listens on port `80`
- `frontend` runs the production Next.js server internally on port `3000`
- `backend` runs Django with `gunicorn` internally on port `8000`
- `nginx` proxies `/` to the frontend and `/api/` to the backend
- `nginx` also serves `/media/` and `/static/`
- SQLite data is stored on a Docker volume so it survives container recreation

Create a root `.env` file before deploying and set at least:

```env
DEBUG=0
DJANGO_SECRET_KEY=replace-this-with-a-strong-secret
DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com,your-vps-ip
CORS_ALLOWED_ORIGINS=https://your-domain.com
CSRF_TRUSTED_ORIGINS=https://your-domain.com
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_MEDIA_BASE_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id_here
```

Then start the stack:

```bash
docker compose up --build -d
```

For a VPS deployment, point your domain to the server and open port `80`. If you add SSL later, put it in front of this `nginx` setup or extend the config with HTTPS certificates.
