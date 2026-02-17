const LITTLE_LIGHT_STUDIOS_URL = 'https://little-light-studios.vercel.app/';

export default function renderVideos() {
  return `
    <div class="content-section">
      <div class="page-header">
        <div class="athariq-logo-container">
          <img src="/Little_Light__Studios_Logo.jpg" alt="Little Light Studios" class="athariq-logo" onerror="this.style.display='none'">
        </div>
        <h1>Little Light Studios</h1>
        <p class="hero-subtitle" style="margin-bottom: 0;">Gentle learning, nap time, and bedtime content for young children. Designed for parents to navigate easily.</p>
      </div>

      <div class="section">
        <p>
          Calm stories and kind learning for little ones. Little Light Studios creates 
          gentle content that fits into nap time, bedtime, and everyday moments—made 
          for parents to find and use with ease.
        </p>
      </div>

      <div class="button-group">
        <a href="${LITTLE_LIGHT_STUDIOS_URL}" class="btn btn-primary external-link" target="_blank" rel="noopener noreferrer">Visit Little Light Studios</a>
      </div>
    </div>
  `;
}
