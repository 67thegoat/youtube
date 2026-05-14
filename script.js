let videos = JSON.parse(localStorage.getItem("videos")) || [];

function save() {
  localStorage.setItem("videos", JSON.stringify(videos));
}

function uploadVideo() {

  const title = document.getElementById("title").value.trim();
  const channel = document.getElementById("channel").value.trim();
  const video = document.getElementById("video").value.trim();

  if(title === "" || channel === "" || video === "") {
    alert("Fill all fields");
    return;
  }

  videos.unshift({
    title,
    channel,
    video,
    likes: 0
  });

  save();

  document.getElementById("title").value = "";
  document.getElementById("channel").value = "";
  document.getElementById("video").value = "";

  renderVideos();
}

function likeVideo(i) {
  videos[i].likes++;
  save();
  renderVideos();
}

function renderVideos(search = "") {

  const container = document.getElementById("videos");

  container.innerHTML = "";

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.channel.toLowerCase().includes(search.toLowerCase())
  );

  filtered.forEach((v, i) => {

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

document.querySelector("header input").addEventListener("input", (e) => {
  renderVideos(e.target.value);
});

renderVideos();
