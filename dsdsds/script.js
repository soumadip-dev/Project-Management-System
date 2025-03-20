///////// DOM elements
const videoContainer = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');

///////// AOI URL
const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

///////// Global variable
let allVideos = [];

///////// Functions

// Function to fetch videos from API
async function fetchVideos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to load videos');
    }

    const data = await response.json();
    allVideos = data?.data?.data?.map(item => item.items);
    displayVideos(allVideos);
  } catch (error) {
    console.error(error.message);
    errorElement.textContent = error.message;
    errorElement.classList.remove('d-none');
  }
}

// Function to display videos on the page
function displayVideos(videos) {
  videoContainer.innerHTML = '';

  if (videos.length === 0) {
    videoContainer.innerHTML =
      '<h4 class="text-center text-muted">No videos found</h4>';
    return;
  }

  videos.forEach(video => {
    const videoElem = document.createElement('div');
    videoElem.classList.add('col');

    videoElem.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${
              video.id
            }"  class="card h-100 video-card text-decoration-none text-dark">
                <img src="${
                  video.snippet?.thumbnails?.medium?.url || ''
                }" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${
                      video.snippet?.title || 'No Title'
                    }</h5>
                    <p class="card-text text-muted">${
                      video.snippet?.channelTitle || 'Unknown Channel'
                    }</p>
                </div>
            </a>
        `;

    videoContainer.appendChild(videoElem);
  });
}

// Function to filter videos by search
function handleSearch() {
  const query = searchInput.value.toLowerCase();
  displayVideos(
    allVideos.filter(
      video =>
        video.snippet?.title?.toLowerCase().includes(query) ||
        video.snippet?.channelTitle?.toLowerCase().includes(query)
    )
  );
}

///////// Event listeners
searchInput.addEventListener('input', handleSearch);
document.addEventListener('DOMContentLoaded', fetchVideos);
