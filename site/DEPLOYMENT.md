# HexGrid 3D Site - Deployment Guide

This guide covers deploying the HexGrid 3D promotional site to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository access
- Node.js 18+ installed locally (for testing)

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat(site): add Next.js promotional site"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Configure the project:
     - **Root Directory**: `shared-ui/src/components/Chamber/hexgrid-3d/site`
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - You'll get a URL like `https://hexgrid-3d-site.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Site Directory**
   ```bash
   cd shared-ui/src/components/Chamber/hexgrid-3d/site
   ```

4. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 3: Deploy from Monorepo Root

If deploying from the monorepo root:

1. **Create vercel.json at root** (if needed):
   ```json
   {
     "buildCommand": "cd shared-ui/src/components/Chamber/hexgrid-3d/site && npm install && npm run build",
     "outputDirectory": "shared-ui/src/components/Chamber/hexgrid-3d/site/.next",
     "installCommand": "cd shared-ui/src/components/Chamber/hexgrid-3d/site && npm install"
   }
   ```

2. **Set Root Directory in Vercel Dashboard**:
   - Go to Project Settings → General
   - Set Root Directory to: `shared-ui/src/components/Chamber/hexgrid-3d/site`

## Environment Variables

Currently, no environment variables are required. If you need to add any:

1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy to apply changes

## Custom Domain

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `hexgrid-3d.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Deploys from `main` branch
- **Preview**: Creates preview deployments for pull requests

To configure:
1. Go to Project Settings → Git
2. Connect your repository
3. Set production branch (default: `main`)
4. Enable preview deployments for PRs

## Build Configuration

The site uses the following build configuration (in `vercel.json`):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## Troubleshooting

### Build Fails

1. **Check Node.js Version**
   - Vercel uses Node.js 18.x by default
   - Update in Project Settings → General → Node.js Version

2. **Check Build Logs**
   - Go to Deployments → Select failed deployment → View Build Logs
   - Look for error messages

3. **Test Locally**
   ```bash
   cd shared-ui/src/components/Chamber/hexgrid-3d/site
   npm install
   npm run build
   ```

### Dependencies Not Found

If dependencies from parent directory are needed:

1. **Option 1**: Copy dependencies to `site/node_modules`
2. **Option 2**: Use monorepo root deployment (Option 3 above)
3. **Option 3**: Install dependencies in build command

### 404 Errors

- Ensure all routes have corresponding `page.tsx` files
- Check that `next.config.js` is properly configured
- Verify `outputDirectory` in `vercel.json` matches build output

## Performance Optimization

Vercel automatically optimizes:
- Image optimization via Next.js Image component
- Automatic code splitting
- Edge caching
- CDN distribution

## Analytics

To add Vercel Analytics:

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. Add to your app (optional, for custom tracking)

## Monitoring

- **Deployments**: View all deployments in Vercel dashboard
- **Logs**: Access function logs in Project → Logs
- **Metrics**: View performance metrics in Project → Analytics

## Rollback

To rollback to a previous deployment:

1. Go to Deployments
2. Find the deployment you want to restore
3. Click "..." menu → "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)
