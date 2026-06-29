export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Kranthi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
