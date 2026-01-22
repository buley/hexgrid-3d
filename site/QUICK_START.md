# Quick Start Guide

Get the HexGrid 3D promotional site up and running in minutes.

## Local Development

1. **Navigate to site directory**
   ```bash
   cd shared-ui/src/components/Chamber/hexgrid-3d/site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Visit [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Quick Deploy (CLI)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to site directory
cd shared-ui/src/components/Chamber/hexgrid-3d/site

# Deploy
vercel
```

### Deploy via Dashboard

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. Set root directory: `shared-ui/src/components/Chamber/hexgrid-3d/site`
5. Click Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Project Structure

```
site/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with metadata
│       ├── page.tsx        # Homepage
│       ├── docs/
│       │   └── page.tsx     # Documentation
│       └── examples/
│           └── page.tsx     # Code examples
├── next.config.js          # Next.js config
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies
```

## Customization

- **Homepage**: Edit `src/app/page.tsx`
- **Documentation**: Edit `src/app/docs/page.tsx`
- **Examples**: Edit `src/app/examples/page.tsx`
- **Styling**: Edit `src/app/globals.css`
- **Metadata**: Edit `src/app/layout.tsx`

## Next Steps

- Read [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment details
- Check the main [README.md](../README.md) for HexGrid 3D component docs
