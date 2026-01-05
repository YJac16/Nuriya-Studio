export default function renderFounder(externalUrls) {
  const founderUrl = externalUrls.founder || '#';
  
  return `
    <div class="content-section">
      <div class="page-header">
        <div class="founder-image-container">
          <img src="/Yaseen_Jacobs_Profile_Picture.JPG" alt="Yaseen Jacobs" class="founder-image">
        </div>
        <h1>Yaseen Jacobs</h1>
        <p style="font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 3rem;">Founder & Creative Developer</p>
      </div>
      
      <div class="section">
        <p>
          Yaseen Jacobs is the founder and creative developer behind Nūriya Studio. 
          With a passion for thoughtful design and interactive experiences, Yaseen leads 
          the studio's vision and creative direction.
        </p>
        <p>
          Through years of work in digital design and game development, Yaseen has 
          developed a unique approach to creating meaningful digital experiences that 
          balance technical excellence with creative vision.
        </p>
      </div>

      <div class="button-group">
        <a href="${founderUrl}" class="btn btn-primary external-link" target="_blank" rel="noopener noreferrer">View Founder Profile</a>
      </div>
    </div>
  `;
}

