# IDATA2301-Project-2025
The frontend of the project for the spring semester of 2025

## How to deploy

Make the following compose file:
```
services:
  db:
    restart: unless-stopped
    image: docker.io/postgres
    env_file: .env
    volumes:
      - ./data:/var/lib/postgresql
    ports:
      - 5432:5432

  backend:
    restart: unless-stopped
    image: ghcr.io/nezerpz/rental-roulette:latest
    env_file: .env
    ports:
      - 8080:8080
    depends_on:
      db:
        condition: service_started

  frontend:
    restart: unless-stopped
    image: ghcr.io/nezerpz/rental-roulette-frontend:latest
    env_file: .env-frontend
    ports:
      - 80:80
      - 443:443
    restart: always
    volumes:
      - ./nginx-config:/etc/nginx/conf.d/:ro
      - ./certbot/www:/var/www/certbot/:ro
      - ./certbot/conf:/etc/nginx/ssl/:ro
  certbot:
    image: certbot/certbot:latest
    volumes:
      - ./certbot/www:/var/www/certbot/:rw
      - ./certbot/conf:/etc/letsencrypt/:rw
```

Then make a file named `.env` in cwd with contents:

```
SPRING_APPLICATION_NAME=rentalroulette
SERVER_PORT=8080
SPRING_JPA_DATABASE=POSTGRESQL
SPRING_DATASOURCE_PLATFORM=postgres
DB_PORT=5432
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="something"
SPRING_DATASOURCE_URL=jdbc:postgresql://db:${DB_PORT}/postgres
SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=true
SPRING_JPA_GENERATE_DDL=true
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_PROPERTIES_HIBERNATE_JDBC_LOB_NON_CONTEXTUAL_CREATION=true
FRONTEND_URL=https://sub.domain.com/
JWT_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Then put the following nginx file inside `./nginx-config` as `default.conf`

```
server {
    listen 80;
    listen [::]:80;
    server_name sub.domain.com;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301  https://sub.domain.com$request_uri;
    }

}

server {
    listen 443 default_server ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name sub.domain.com;

    ssl_certificate /etc/nginx/ssl/live/sub.domain.com/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/sub.domain.com/privkey.pem;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080/api;
    }
    
    location /user-uploads {
        proxy_pass http://localhost:8080/user-uploads;
    }

    location /assets/ {
        try_files $uri =404;
    }
}
```

Then comment out the second server block and run: `docker compose up -d`

When everything has started (check with ps), do a certbot dry-run: `docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d sub.domain.org`

If the dry-run succeeds without error, remove `--dry-run` from the above command and run again (to actually download certificates).

After this, restart the frontend-container (and ensure baked urls in image matches actual domain name, otherwise image must be rebuilt after changing env vars used in workflow).
