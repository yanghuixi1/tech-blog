const createPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-input").value.trim();
  const content = document.querySelector("#content-input").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      let message = await response.json();
      alert(message.message);
    }
  }
};

const newPostHandler = async (event) => {
  document.querySelector(".create-post-box").removeAttribute("hidden");
};

document
  .querySelector(".create-post-box")
  .addEventListener("submit", createPostHandler);

document
  .querySelector("#new-post-btn")
  .addEventListener("click", newPostHandler);
