const YOUTUBE_VIDEO_ID = 'IBsQIqzzl7s';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@LivelyLittleLearners';

export default function renderWork(externalUrls) {
  return `
    <div class="content-section">
      <div class="page-header">
        <h1>Work</h1>
      </div>

      <div class="section video-section">
        <h3>Featured Video</h3>
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}"
            title="YouTube video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p class="video-channel-link">
          <a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener noreferrer">Lively Little Learners</a>
        </p>
      </div>
      
      <div class="section">
        <h3>Web Experiences</h3>
        <p>
          We craft web experiences that prioritize clarity, performance, and user intent. 
          Each project begins with understanding the core message and designing an interface 
          that serves it thoughtfully.
        </p>
      </div>

      <div class="section">
        <h3>Interactive Storytelling</h3>
        <p>
          Through narrative design and interactive elements, we create experiences that 
          engage users on both intellectual and emotional levels. Every interaction is 
          intentional and serves the story.
        </p>
      </div>

      <div class="section">
        <h3>Game Systems</h3>
        <p>
          Our approach to game design focuses on meaningful mechanics and elegant systems. 
          We build games that challenge, inspire, and resonate long after play ends.
        </p>
      </div>

      <div class="section">
        <h3>Digital Design</h3>
        <p>
          From concept to execution, we design with purpose. Our work balances aesthetic 
          beauty with functional clarity, creating digital products that feel both timeless 
          and contemporary.
        </p>
      </div>
    </div>
  `;
}



