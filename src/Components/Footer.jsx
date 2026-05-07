const Footer = () => {
  return (
    <footer className="mt-16 py-6 border-t border-amber-200/70 bg-amber-50/70">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-800/70">
          © {new Date().getFullYear()} Cinema Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
