export default function renderHome(externalUrls) {
  return `
    <div class="hero">
      <div class="hero-logo-container">
        <img src="/Nuriya Studios Logo.png" alt="Nūriya Studio" class="hero-logo" onerror="this.src='/Nuriya Logo Vector.png'">
      </div>
      <p class="hero-subtitle">A creative studio building thoughtful digital and interactive experiences.</p>
      <div class="button-group">
        <a href="/work" class="btn btn-primary" data-navigate>View Work</a>
        <a href="/athariq" class="btn" data-navigate>Explore Games</a>
      </div>
    </div>
  `;
}

