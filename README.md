# OPD Core — Open Portable Document

> An open, web-native, signed, and accessible document format designed to progressively replace PDF in digital workflows.

## 🎯 Vision

Create a document format that is:
- **Open** : Public specification, no patents
- **Web-native** : HTML/CSS/JS, works in all browsers
- **Signed** : Cryptographic integrity (Ed25519)
- **Accessible** : WCAG 2.1 AA compliant, AI-readable
- **Portable** : Single self-contained `.opd.zip` file

## 🚀 Quick Start

### 🌐 Try it Online

**OPD Studio** (DOCX → OPD Converter): https://opd-core-6ojjizaow-heakos-projects.vercel.app

### 💻 Local Installation

#### Prerequisites

- Node.js >= 18
- npm >= 10

#### Installation

```bash
# Clone the repository
git clone https://github.com/Heako/opd-studio.git
cd opd-studio

# Install dependencies
npm install

# Run opd-studio in development mode
npm run studio

# Run opd-viewer in development mode
npm run viewer

# Build all packages
npm run build

# Run tests
npm test
```

## 📦 Monorepo Structure

```
opd-core/
├── apps/
│   ├── opd-studio/       # Web interface (Next.js + React 18)
│   └── opd-viewer/       # PWA viewer
├── packages/
│   ├── opd-spec/         # Format specification
│   ├── opd-bridge-docx/  # DOCX → OPD conversion
│   ├── opd-semantic/     # JSON-LD generation
│   ├── opd-sign/         # Cryptographic signatures
│   └── opd-pack/         # Packaging CLI
├── tests/
│   ├── golden/           # Reference test files
│   └── e2e/              # End-to-end tests
└── docs/                 # Documentation
```

## ✨ Current Features (v0.1)

- ✅ **DOCX → OPD conversion** with style preservation
- ✅ **Automatic CSS generation** for rendering
- ✅ **Ed25519 cryptographic signatures** for integrity
- ✅ **JSON-LD metadata** (Schema.org)
- ✅ **Preview** before download
- ✅ **Viewer with signature verification**
- ✅ **Responsive drag & drop interface**
- ✅ **Integrated documentation**

## 🛠️ Technologies

- **React 18.2** + **Next.js 14** (App Router)
- **TypeScript 5.6**
- **Turborepo 2.5** (monorepo build system)
- **npm workspaces** (package manager)
- **Tailwind CSS** (styling)
- **Heroicons** (icons)
- **Mammoth.js** (DOCX parsing)
- **jose** (Ed25519 signatures)
- **fflate** (ZIP compression)

## 📖 Documentation

See the [`docs/`](./docs/) folder for:
- [PRD](./docs/PRD.md) - Product Requirement Document
- [ROADMAP](./docs/ROADMAP.md) - Detailed roadmap
- [Architecture](./docs/architecture.md) - Technical architecture

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## 📜 License

**MIT License** - See [LICENSE](./LICENSE) for details.

## 🔗 Links

- **Live Demo**: https://opd-core-6ojjizaow-heakos-projects.vercel.app
- **GitHub**: https://github.com/Heako/opd-studio
- **Documentation**: [docs/](./docs/)
- Website: [openopd.org](https://openopd.org) (coming soon)

---

**Current Version**: v0.1.0 ✅ (Phase v0.1 completed)
**Status**: 🟢 Functional prototype in production
**Next Phase**: v0.3 - Complete viewer + Offline mode

