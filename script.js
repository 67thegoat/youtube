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
    likes: 0,
    dislikes: 0,
    liked: false,
    disliked: false,
    subscribed: false,
    comments: []
  });

  save();

  document.getElementById("title").value = "";
  document.getElementById("channel").value = "";
  document.getElementById("video").value = "";

  renderVideos();
}

function toggleLike(i) {

  if(videos[i].liked) {
    videos[i].likes--;
    videos[i].liked = false;
  } else {

    videos[i].likes++;
    videos[i].liked = true;

    if(videos[i].disliked) {
      videos[i].dislikes--;
      videos[i].disliked = false;
    }
  }

  save();
  renderVideos();
}

function toggleDislike(i) {

  if(videos[i].disliked) {
    videos[i].dislikes--;
    videos[i].disliked = false;
  } else {

    videos[i].dislikes++;
    videos[i].disliked = true;

    if(videos[i].liked) {
      videos[i].likes--;
      videos[i].liked = false;
    }
  }

  save();
  renderVideos();
}

function toggleSubscribe(i) {
  videos[i].subscribed = !videos[i].subscribed;

  save();
  renderVideos();
}

function addComment(i) {

  const input = document.getElementById(`comment-${i}`);

  const text = input.value.trim();

  if(text === "") return;

  videos[i].comments.push(text);

  input.value = "";

  save();
  renderVideos();
}

function deleteComment(videoIndex, commentIndex) {

  videos[videoIndex].comments.splice(commentIndex, 1);

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

              <button onclick="toggleLike(${i})">
                ${v.liked ? "👍 Liked" : "👍 Like"} ${v.likes}
              </button>

              <button onclick="toggleDislike(${i})">
                ${v.disliked ? "👎 Disliked" : "👎 Dislike"} ${v.dislikes}
              </button>

              <button onclick="toggleSubscribe(${i})">
                ${v.subscribed ? "Subscribed" : "Subscribe"}
              </button>

            </div>

            <div class="comment-area">

              <input
                id="comment-${i}"
                placeholder="Write comment..."
              >

              <button onclick="addComment(${i})">
                Comment
              </button>

            </div>

            <div class="comments">

              ${v.comments.map((c, ci) => `
                <div class="comment">

                  ${c}

                  <button
                    onclick="deleteComment(${i}, ${ci})"
                  >
                    Delete
                  </button>

                </div>
              `).join("")}

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
