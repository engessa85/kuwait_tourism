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

This project now uses two Docker compose layers:

- `docker-compose.yml`: local/default stack over HTTP
- `docker-compose.prod.yml`: VPS/production overrides with HTTPS support

Shared behavior:

- `frontend` runs the production Next.js server internally on port `3000`
- `backend` runs Django with `gunicorn` internally on port `8000`
- `nginx` proxies `/` to the frontend and `/api/` plus `/admin/` to the backend
- `nginx` also serves `/media/` and `/static/`
- SQLite data is stored on a Docker volume so it survives container recreation

Copy `.env.example` to `.env` and update it for your environment.

### Local

For local development, a root `.env` like this is enough:

```env
DEBUG=0
DJANGO_SECRET_KEY=replace-this-with-a-strong-secret
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost
CSRF_TRUSTED_ORIGINS=http://localhost
SECURE_SSL_REDIRECT=0
SESSION_COOKIE_SECURE=0
CSRF_COOKIE_SECURE=0
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_MEDIA_BASE_URL=
NEXT_PUBLIC_SITE_URL=http://localhost
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id_here
```

Start the local stack:

```bash
docker compose up --build -d
```

### Production

For the VPS, use a root `.env` like this:

```env
DEBUG=0
DJANGO_SECRET_KEY=replace-this-with-a-strong-secret
DJANGO_ALLOWED_HOSTS=kuwaittourism.online,www.kuwaittourism.online,72.61.84.66
CORS_ALLOWED_ORIGINS=https://kuwaittourism.online,https://www.kuwaittourism.online
CSRF_TRUSTED_ORIGINS=https://kuwaittourism.online,https://www.kuwaittourism.online
SECURE_SSL_REDIRECT=1
SESSION_COOKIE_SECURE=1
CSRF_COOKIE_SECURE=1
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_MEDIA_BASE_URL=
NEXT_PUBLIC_SITE_URL=https://kuwaittourism.online
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id_here
```

Bring up the VPS stack:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Issue the initial Let's Encrypt certificate after DNS for `kuwaittourism.online` and `www.kuwaittourism.online` points to the VPS:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  -d kuwaittourism.online -d www.kuwaittourism.online \
  --email you@example.com --agree-tos --no-eff-email
```

Then restart nginx so it switches from the bootstrap HTTP config to the HTTPS config:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml restart nginx
```

After that:

- `http://kuwaittourism.online` redirects to HTTPS
- `https://kuwaittourism.online` serves the app
- the `certbot` container handles renewal attempts in the background
