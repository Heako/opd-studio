export function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>
            <p>
              © 2025 OPD Core · Open Portable Document
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/openopd/opd-core"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="/docs"
              className="hover:text-gray-900 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/openopd/opd-core/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

