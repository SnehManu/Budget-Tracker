# Deploying to Vercel

This project deploys as two Vercel projects: one for the frontend and one for
the Express API. MongoDB must be reachable from Vercel, for example through
MongoDB Atlas.

## 1. Deploy the backend

1. Import the repository into Vercel and set the project's **Root Directory**
   to `backend`.
2. Add these environment variables in the Vercel project settings:
   - `MONGO_URL`: the MongoDB Atlas connection string.
   - `JWT_SECRET_KEY`: a long, random secret used to sign auth tokens.
   - `FRONTEND_URL`: the production URL of the frontend Vercel project. You can
     add this after deploying the frontend, then redeploy the backend.
3. Deploy. Vercel should detect the Express app from `server.js`. Save the
   resulting backend URL.

Do not commit `.env` files or put secret values in `vercel.json`.
Vercel sets `NODE_ENV` for production deployments automatically.

## 2. Deploy the frontend

1. Create a second Vercel project from the same repository and set its **Root
   Directory** to `frontend`.
2. In `frontend/vercel.json`, replace
   `https://your-backend-project.vercel.app` with the backend URL from step 1.
   Keep the `/api/:path*` suffix in the rewrite destination.
3. Deploy the frontend. Its `/api` requests will be proxied to the backend,
   keeping API calls and auth cookies same-origin in the browser.
4. Set the backend's `FRONTEND_URL` to this frontend's production URL and
   redeploy the backend.

## Local development

The frontend continues to use `http://localhost:3000/api/` in Vite development.
Run the backend and frontend in separate terminals; the backend needs
`backend/.env` with `MONGO_URL` and `JWT_SECRET_KEY`.
