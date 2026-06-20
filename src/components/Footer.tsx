export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">[APK]</span>
        <div><strong>AppSec Prompt Kit</strong><span>Built for defensive AppSec review workflows.</span></div>
      </div>
      <div className="footer-copy">
        <p>No backend. No account. Uploaded Pro Packs stay in your browser.</p>
        <p>
          Pro Pack access is handled manually through Telegram:{" "}
          <a href="https://t.me/Nanodex2" target="_blank" rel="noreferrer">@Nanodex2</a>. Price: $20. Crypto accepted.
        </p>
      </div>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
