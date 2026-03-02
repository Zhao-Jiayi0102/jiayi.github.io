function getSlug() {
  const url = new URL(window.location.href);
  return url.searchParams.get("slug");
}

async function loadProjects() {
  const res = await fetch("data/projects.json");
  if (!res.ok) throw new Error("Failed to load projects.json");
  return await res.json();
}

function render(p) {
  document.title = `${p.title} — Jiayi Zhao`;

  // hero
  const hero = document.getElementById("pHero");
  hero.src = p.hero || p.cover;
  hero.alt = p.title;

  // text
  document.getElementById("pTitle").textContent = p.title;
  document.getElementById("pSubtitle").textContent = p.subtitle || "";
  document.getElementById("pIntro").textContent = p.intro || "";

  // video (works for any project)
  const container = document.getElementById("pVideo");
  container.innerHTML = "";

  if (p.video && p.video.type === "local") {
    container.innerHTML = `
      <video controls playsinline preload="metadata">
        <source src="${p.video.src}" type="video/mp4">
      </video>
    `;
  }

  // gallery
  const gallery = document.getElementById("pGallery");
  gallery.innerHTML = "";
  (p.gallery || []).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = p.title;
    gallery.appendChild(img);
  });
}

(async function init() {
  try {
    const slug = getSlug();
    const projects = await loadProjects();
    const p = projects.find(x => x.slug === slug) || projects[0];
    render(p);
  } catch (e) {
    console.error(e);
    document.body.innerHTML = `<div style="max-width:720px;margin:80px auto;font-family:Inter;color:#333;padding:0 18px;">
      <h1>Project not found</h1>
      <p>Please go back to <a href="index.html">home</a>.</p>
    </div>`;
  }
})();