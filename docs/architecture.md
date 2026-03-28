# Architecture V1

## Dossiers

- `app/`: routes App Router, pages publiques, admin et API.
- `components/`: composants UI et blocs d'interface reutilisables.
- `lib/`: acces DB, auth, validations, utilitaires, constantes.
- `prisma/`: schema, seed et futur historique de migrations.
- `types/`: types partages lies au domaine.
- `docs/`: documentation courte de structure et d'exploitation.

## Principes

- logique serveur dans `lib/` et routes `app/api/`
- UI decouplee des acces DB
- validation serveur centralisee avec Zod
- admin protegee par session signee
- V1 simple avec `imageUrl`, sans upload
- endpoint interne extensible pour n8n
