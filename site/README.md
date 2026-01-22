# HexGrid 3D - Promotional Site

This is a Next.js mini site to promote and document the HexGrid 3D project.

## Features

- **Landing Page** - Showcase the component with features and quick start
- **Documentation** - Complete API documentation and usage guide
- **Examples** - Code examples and use cases
- **Vercel Ready** - Configured for easy deployment to Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push this repository to GitHub
2. Import the project in Vercel dashboard
3. Set the root directory to `shared-ui/src/components/Chamber/hexgrid-3d/site`
4. Configure build settings:
   - Build Command: `cd ../.. && npm install && cd site && npm install && npm run build`
   - Output Directory: `.next`
   - Install Command: `cd ../.. && npm install && cd site && npm install`

### Option 3: Using vercel.json

The `vercel.json` file is already configured. Simply:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js project
3. The build configuration in `vercel.json` will be used

## Project Structure

```
site/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Homepage
│       ├── docs/
│       │   └── page.tsx     # Documentation page
│       └── examples/
│           └── page.tsx     # Examples page
├── next.config.js          # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment configuration
└── package.json           # Dependencies
```

## Customization

- Update `src/app/page.tsx` to customize the homepage
- Modify `src/app/docs/page.tsx` for documentation changes
- Edit `src/app/globals.css` for styling changes
- Update metadata in `src/app/layout.tsx` for SEO

## License

Personal Use Only - See LICENSE file in parent directory for full terms.
