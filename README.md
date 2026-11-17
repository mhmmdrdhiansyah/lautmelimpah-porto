# LautMelimpah — B2B Seafood Export Platform

Next.js 15 platform for LautMelimpah, a Belitung-based seafood export trading
company: commodity catalog, inquiry list + RFQ, legality & logistics pages,
and an internal admin panel. Prices are never public — every call to action is
"Request a quotation".

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS + shadcn/ui ·
Framer Motion · Prisma ORM · MySQL · Resend · Docker (node:22-alpine).

## Prerequisites

- Node 22+ and npm
- Docker with an existing MySQL 8.4 container named `mysql`, joined to the
  `mysql_net` network (no MySQL is installed or created by this repo)
- A `lautmelimpah` database inside that container

## Development

```bash
npm i

# create the database in the existing container (first time only)
docker exec mysql mysql -uapp -papp -e "CREATE DATABASE IF NOT EXISTS lautmelimpah CHARACTER SET utf8mb4;"

# .env — copy from .env.example and fill in; for host-side dev use 127.0.0.1:
# DATABASE_URL="mysql://app:app@127.0.0.1:3306/lautmelimpah"

npx prisma migrate dev     # create tables
npm run db:seed            # seed 5 categories, 6 products, 8 documents
npm run dev                # http://localhost:3000
```

Email: without `RESEND_API_KEY`, RFQ emails are logged to the console as
`[dev-email]` instead of sent (dev mode, no error).

## Tests

```bash
npx vitest run src prisma
```

## Admin

`/admin` — login with `ADMIN_EMAIL` and the password whose sha256 hash is in
`ADMIN_PASSWORD_HASH`. Dev default: `admin123`.

Generate a password hash:

```bash
echo -n "your-password" | sha256sum
```

## Deploy

```bash
docker compose up -d --build
```

- App runs on port 3000 (`output: "standalone"`).
- The app container joins the external `mysql_net` network and reaches the
  database as host `mysql`.
- `.env` supplies the environment (it is not committed and is in
  `.dockerignore`).

Generate `ADMIN_SESSION_SECRET`:

```bash
openssl rand -hex 32
```

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection (`mysql://app:app@mysql:3306/lautmelimpah` in the container) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | sha256 hex of the admin password |
| `ADMIN_SESSION_SECRET` | HS256 secret for admin session JWTs (`openssl rand -hex 32`) |
| `RESEND_API_KEY` | Resend API key; empty = log emails to console |
| `RFQ_SALES_INBOX` | Sales inbox that receives RFQ notifications |

## Placeholder content

Photographs are Wikimedia Commons stand-ins (credited in the footer); the
sales email is a `.example` stand-in. Replace both once the client supplies
the real logo, photos and address (see `design.md` §6).
