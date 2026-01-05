export default function renderAthariq(externalUrls) {
  const athariqUrl = externalUrls.athariq || '#';
  
  return `
    <div class="content-section">
      <div class="page-header">
        <div class="athariq-logo-container">
          <img src="/Athariq Logo.png" alt="Āthariq" class="athariq-logo" onerror="this.src='/Athariq Logo Vector.png'">
        </div>
      </div>
      
      <div class="section">
        <p>
          Āthariq is the interactive games label by Nūriya Studio. Through this platform, 
          we explore game design, narrative mechanics, and interactive experiences that 
          push the boundaries of digital storytelling.
        </p>
        <p>
          Our games are designed to be thoughtful, engaging, and memorable—each one a 
          unique journey into carefully crafted worlds and systems.
        </p>
      </div>

      <div class="button-group">
        <a href="${athariqUrl}" class="btn btn-primary external-link" target="_blank" rel="noopener noreferrer">Visit Āthariq</a>
      </div>
    </div>
  `;
}

