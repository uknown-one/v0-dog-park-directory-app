# GitHub Pages Deployment Guide

## Current Limitation

This Dog Park Directory app uses **server-side API routes** and **NextAuth.js authentication**, which are **not compatible** with GitHub Pages static hosting. GitHub Pages only supports static files and cannot run Node.js server code.

## Deployment Options

### Option 1: Vercel (Recommended)
Deploy to Vercel for full functionality including API routes and authentication:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Deploy automatically

### Option 2: Static Version for GitHub Pages

To deploy a static version to GitHub Pages, you need to:

1. **Remove API routes** (`app/api/` folder)
2. **Remove authentication** (NextAuth.js)
3. **Use static data** instead of dynamic features
4. **Enable static export** in `next.config.mjs`:
   \`\`\`js
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     basePath: '/your-repo-name', // if deploying to repo subdirectory
     assetPrefix: '/your-repo-name/',
   }
   \`\`\`

### Option 3: Alternative Hosting
Consider these platforms that support full-stack Next.js apps:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Render**

## GitHub Pages Setup (Static Version Only)

If you choose to create a static version:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The workflow will automatically deploy on push to main branch
4. Set repository secrets for environment variables

## Environment Variables

Add these secrets in your GitHub repository settings:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `GOOGLE_CLIENT_ID` (if keeping auth)
- `GOOGLE_CLIENT_SECRET` (if keeping auth)
- `NEXTAUTH_URL` (if keeping auth)
- `NEXTAUTH_SECRET` (if keeping auth)
