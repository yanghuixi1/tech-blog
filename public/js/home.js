const singlePostHandler = async (event) => {
  let postId = event.currentTarget.parentNode.dataset.postId;
  document.location = `/posts/${postId}`;
};

document.querySelectorAll(".post-title").forEach((post) => {
  post.addEventListener("click", singlePostHandler);
});
