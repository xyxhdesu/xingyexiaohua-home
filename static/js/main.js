(() => {
  const passwordDialog = document.querySelector(".password-dialog");
  const passwordForm = document.querySelector(".password-form");
  const passwordInput = document.querySelector("#site-password");
  const passwordError = document.querySelector("#password-error");
  const passwordSuccess = document.querySelector("#password-success");
  const cancelButton = document.querySelector("[data-password-cancel]");
  let gatedLink;

  document.querySelectorAll("[data-password-gate]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      gatedLink = link;
      passwordForm.reset();
      passwordError.hidden = true;
      if (passwordSuccess) passwordSuccess.hidden = true;
      passwordDialog.showModal();
      passwordInput.focus();
    });
  });

  passwordForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gatedLink || passwordInput.value !== gatedLink.dataset.password) {
      passwordError.hidden = false;
      if (passwordSuccess) passwordSuccess.hidden = true;
      passwordInput.select();
      return;
    }

    passwordError.hidden = true;
    if (passwordSuccess) passwordSuccess.hidden = false;
    passwordInput.select();
  });

  cancelButton?.addEventListener("click", () => passwordDialog.close());

  const container = document.querySelector("[data-blog-index]");
  const list = document.querySelector("#blog-updates");
  if (!container || !list) return;

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.valueOf())
      ? "最新文章"
      : new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };

  const renderPosts = (posts) => {
    list.replaceChildren();
    posts.slice(0, 3).forEach((post) => {
      const link = document.createElement("a");
      const date = document.createElement("time");
      const title = document.createElement("h3");
      link.className = "update-card";
      const postUrl = post.permalink || post.RelPermalink || post.url || "/";
      link.href = new URL(postUrl, container.dataset.blogIndex).href;
      link.textContent = "";
      date.dateTime = post.date || "";
      date.textContent = formatDate(post.date);
      title.textContent = post.title || "未命名文章";
      link.append(date, title);
      list.append(link);
    });
  };

  fetch(container.dataset.blogIndex)
    .then((response) => {
      if (!response.ok) throw new Error("Blog index unavailable");
      return response.json();
    })
    .then((posts) => {
      if (!Array.isArray(posts) || posts.length === 0) throw new Error("No posts");
      renderPosts(posts);
    })
    .catch(() => {
      list.innerHTML = '<p class="empty">最近更新将在博客发布后显示。</p>';
    });
})();
