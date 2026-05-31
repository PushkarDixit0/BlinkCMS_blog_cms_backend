# Production Deployment

## Architecture

The project deploys as two Vercel projects:

- Backend: Express API served from `api/index.js`.
- Frontend: Vite SPA served from `dist` with all browser routes rewritten to `index.html`.
- Database: MongoDB Atlas, configured through `MONGODB_URI`.

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user with a strong password.
3. Allow Vercel outbound access. For quick setup use `0.0.0.0/0`; for stricter setups use Atlas/Vercel networking controls available on your plan.
4. Copy the Atlas connection string and set it as `MONGODB_URI`.
5. Keep `DB_REQUIRED=true` or omit it in production; production requires a working database.

## Backend Vercel Settings

Set the project root to this backend folder.

Environment variables:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<long-random-secret>
SESSION_SECRET=<different-long-random-secret>
JWT_EXPIRES_IN_SECONDS=3600
SESSION_EXPIRES_IN_MS=3600000
ADMIN_USERNAME=<admin-user>
ADMIN_PASSWORD=<strong-password>
CLIENT_URL=https://your-frontend.vercel.app
API_URL=https://your-backend.vercel.app
MAX_JSON_BODY_SIZE=1mb
MAX_IMAGE_SIZE_BYTES=2097152
```

## Frontend Vercel Settings

Set the frontend project root to `block-cms/blog-cms`.

Environment variables:

```env
VITE_API_URL=https://your-backend.vercel.app
```

## File Uploads

Uploaded editor images are stored in MongoDB as binary asset records and served through `/post/assets/:assetId`. This is deployment-safe for Vercel because it does not rely on local disk. Keep `MAX_IMAGE_SIZE_BYTES` aligned with your Atlas storage and Vercel function limits.

## Production Checklist

- Backend Vercel env variables are set.
- Frontend `VITE_API_URL` points to the backend deployment.
- Backend `CLIENT_URL` matches the frontend origin.
- Atlas user, password, and network access are configured.
- `JWT_SECRET` and `SESSION_SECRET` are different high-entropy values.
- Admin password is not a development default.
- `pnpm test` passes in the backend.
- `pnpm build` passes in the frontend.
- `/health` returns `{ "status": "ok" }` after deployment.
- Login, post create/update/delete, image upload, public post view, and comment moderation are smoke-tested.
