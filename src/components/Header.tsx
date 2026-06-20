export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AppSec Prompt Kit home">
        <span className="brand-mark" aria-hidden="true">[APK]</span>
        <span>AppSec Prompt Kit</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#catalog">Templates</a>
        <a href="#guided-mode">Guided mode</a>
        <a href="#workflow">Workflow</a>
        <a href="#pack-format">Pack format</a>
        <a href="#safety">Safety</a>
      </nav>
      <a className="button button-small button-ghost header-cta" href="#upload">
        Unlock Pro
      </a>
    </header>
  );
}
