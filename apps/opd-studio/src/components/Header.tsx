import { DocumentTextIcon } from "@heroicons/react/24/solid";

export function Header() {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OPD Studio</h1>
              <p className="text-xs text-gray-500">v0.1.0</p>
            </div>
          </a>
          
          <nav className="flex items-center gap-6">
            <a
              href="https://github.com/openopd/opd-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="/docs"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

