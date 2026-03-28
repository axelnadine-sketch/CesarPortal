# Portail Sites V1

Portail central pour regrouper plusieurs sites web sur une landing publique unique, avec une administration integree, Prisma et une base prete pour un deploiement VPS.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite en local
- PostgreSQL vise en production

## Fonctionnalites

- landing publique premium et responsive
- cartes de sites actives triees par `sortOrder`
- login admin securise par cookie signe
- dashboard admin
- CRUD complet des sites
- activation / desactivation
- mise en avant
- endpoint interne securise pour automatisation future

## Demarrage local

1. Installer les dependances:
```bash
npm install
```
2. Creer un `.env` local SQLite. Exemple minimal:
```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="votre-hash-bcrypt"
AUTH_SECRET="votre-secret-long"
INTERNAL_API_TOKEN="votre-token-interne"
APP_URL="http://localhost:3000"
```
3. Generer Prisma et creer la base locale:
```bash
npm run prisma:generate:local
npm run prisma:push:local
npm run prisma:seed
```
4. Lancer le projet:
```bash
npm run dev
```
5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Identifiants admin locaux

- utilisateur: `admin`
- mot de passe: `ChangeMe123!`

Pensez a remplacer immediatement le hash dans `.env` pour un usage reel:

```bash
npm run admin:hash -- VotreMotDePasseSolide
```

## Variables d'environnement

Voir `[.env.example](/C:/Users/allan/Documents/portail-sites/.env.example)`.

- `DATABASE_URL`: URL de connexion base de donnees
- `ADMIN_USERNAME`: identifiant admin
- `ADMIN_PASSWORD_HASH`: hash bcrypt du mot de passe admin
- `AUTH_SECRET`: secret de signature du cookie admin
- `INTERNAL_API_TOKEN`: token pour l'endpoint interne
- `APP_URL`: URL publique de l'application

## Endpoint interne pour n8n

Route:

```txt
POST /api/internal/sites
```

Authentification:

- header `Authorization: Bearer <INTERNAL_API_TOKEN>`

Payload JSON attendu:

```json
{
  "name": "Nouveau site",
  "slug": "nouveau-site",
  "url": "https://nouveau-site.fr",
  "shortDescription": "Presentation courte du site",
  "longDescription": "Description longue optionnelle",
  "category": "Business",
  "tags": ["seo", "landing"],
  "imageUrl": "https://exemple.com/image.jpg",
  "isActive": true,
  "isFeatured": false,
  "sortOrder": 4
}
```

Le `slug` peut etre omis: il sera derive du `name`.

## PostgreSQL en production

La V1 tourne en SQLite local pour accelerer l'initialisation, mais la cible principale est PostgreSQL. Le schema de production est `[prisma/schema.prisma](/C:/Users/allan/Documents/portail-sites/prisma/schema.prisma)` et le schema local est `[prisma/schema.sqlite.prisma](/C:/Users/allan/Documents/portail-sites/prisma/schema.sqlite.prisma)`.

Pour la production:

1. creer une base PostgreSQL
2. copier `[.env.example](/C:/Users/allan/Documents/portail-sites/.env.example)` vers `.env`
3. remplacer `DATABASE_URL`
4. executer:

```bash
npm run prisma:generate
npm run prisma:deploy
```

Ensuite:

```bash
npm run build
npm run start
```

## Deploiement VPS simple

### Ubuntu

```bash
sudo apt update
sudo apt install -y nginx postgresql postgresql-contrib
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

### Lancement applicatif

Dans le dossier du projet:

```bash
npm ci
npm run prisma:generate
npm run prisma:deploy
npm run build
```

Exemple `systemd` minimal:

```ini
[Unit]
Description=Portail Sites
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/portail-sites
Environment=NODE_ENV=production
EnvironmentFile=/var/www/portail-sites/.env
ExecStart=/usr/bin/npm run start
Restart=always
User=www-data
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

### Nginx

Exemple de proxy:

```nginx
server {
    listen 80;
    server_name portail.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Avec HTTPS en production, ajoutez Certbot puis redirigez HTTP vers HTTPS.

## Verifications utiles

```bash
npm run typecheck
npm run lint
npm run build
```
