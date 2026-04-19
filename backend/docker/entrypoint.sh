#!/bin/sh
set -e

mkdir -p "$(dirname "${SQLITE_PATH:-/app/data/db.sqlite3}")"
mkdir -p /app/media /app/staticfiles

python manage.py migrate --noinput
python manage.py collectstatic --noinput

if [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] && [ -n "$DJANGO_SUPERUSER_FULL_NAME" ]; then
  python create_superuser.py
fi

exec "$@"
