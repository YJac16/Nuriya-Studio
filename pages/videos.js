const YOUTUBE_VIDEO_ID = 'IBsQIqzzl7s';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@LivelyLittleLearners';

export default function renderVideos() {
  return `
    <div class="content-section">
      <div class="page-header">
        <h1>Videos</h1>
      </div>

      <div class="section video-section">
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
    </div>
  `;
}
