# HexGrid 3D Promotional Site

Welcome to the HexGrid 3D promotional site! This Next.js application showcases the HexGrid 3D component with documentation, examples, and deployment instructions.

## 📚 Documentation Index

- **[README.md](./README.md)** - Project overview and development guide
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[SITE_SUMMARY.md](./SITE_SUMMARY.md)** - What was built and how it works

## 🚀 Quick Links

### For Developers
- [Quick Start Guide](./QUICK_START.md) - Start developing locally
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel
- [Site Summary](./SITE_SUMMARY.md) - Understand the structure

### For Users
- [Homepage](./src/app/page.tsx) - Landing page
- [Documentation](./src/app/docs/page.tsx) - API docs
- [Examples](./src/app/examples/page.tsx) - Code examples

## 🎯 What's Included

### Pages
- ✅ **Homepage** - Feature showcase and quick start
- ✅ **Documentation** - Complete API reference
- ✅ **Examples** - Code examples and use cases

### Configuration
- ✅ **Next.js 16** - Latest framework
- ✅ **TypeScript** - Full type safety
- ✅ **Vercel Ready** - Pre-configured deployment
- ✅ **SEO Optimized** - Metadata and Open Graph

### Documentation
- ✅ **README.md** - Project documentation
- ✅ **DEPLOYMENT.md** - Deployment instructions
- ✅ **QUICK_START.md** - Quick start guide
- ✅ **SITE_SUMMARY.md** - Technical summary

## 📦 Project Structure

```
site/
├── src/app/              # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   ├── docs/             # Documentation
│   └── examples/         # Examples
├── next.config.js        # Next.js config
├── vercel.json          # Vercel config
└── package.json         # Dependencies
```

## 🛠️ Development

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

## 🚢 Deployment

### Option 1: Vercel Dashboard (Recommended)
1. Push to GitHub
2. Import in Vercel dashboard
3. Set root: `shared-ui/src/components/Chamber/hexgrid-3d/site`
4. Deploy

### Option 2: Vercel CLI
```bash
npm i -g vercel
cd shared-ui/src/components/Chamber/hexgrid-3d/site
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 Next Steps

1. **Review the site locally**
   ```bash
   cd shared-ui/src/components/Chamber/hexgrid-3d/site
   npm install
   npm run dev
   ```

2. **Customize content**
   - Edit `src/app/page.tsx` for homepage
   - Update `src/app/docs/page.tsx` for docs
   - Modify `src/app/globals.css` for styling

3. **Deploy to Vercel**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Get your live URL

4. **Add features** (optional)
   - Interactive demo
   - Live code editor
   - More examples
   - Blog section

## 🔗 Related Links

- **Component Repository**: [../README.md](../README.md)
- **GitHub**: https://github.com/buley/hexgrid-3d
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## 📄 License

Personal Use Only - See LICENSE file in parent directory.

---

**Ready to deploy?** Start with [QUICK_START.md](./QUICK_START.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)
