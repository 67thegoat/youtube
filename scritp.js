let videos = JSON.parse(localStorage.getItem("videos")) || [];

function save() {
  localStorage.setItem("videos", JSON.stringify(videos));
}

function uploadVideo() {
  const title = document.getElementById("title").value;
  const channel = document.getElementById("channel").value;
  const video = document.getElementById("video").value;

  videos.unshift({
    title,
    channel,
    video,
    likes: 0
  });

  save();
  renderVideos();
}

function likeVideo(i) {
  videos[i].likes++;
  save();
  renderVideos();
}

function renderVideos() {
  const container = document.getElementById("videos");

  container.innerHTML = "";

  videos.forEach((v, i) => {
    container.innerHTML += `
      <div class="video">

        <iframe src="${v.video}" allowfullscreen></iframe>

        <div class="info">
          <div class="avatar"></div>

          <div class="text">
            <h3>${v.title}</h3>
            <p>${v.channel}</p>

            <div class="actions">
              <button onclick="likeVideo(${i})">
                👍 ${v.likes}
              </button>
            </div>

          </div>
        </div>

      </div>
    `;
  });
}

renderVideos();
