async function loadProjects() {
  const res = await fetch("data/projects.json");
  if (!res.ok) throw new Error("Failed to load projects.json");
  return await res.json();
}

function makeCard(p) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = `project.html?slug=${encodeURIComponent(p.slug)}`;

  const img = document.createElement("img");
  img.className = "card__img";
  img.src = p.cover;
  img.alt = p.title;

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = p.title;

  const sub = document.createElement("p");
  sub.className = "card__sub";
  sub.textContent = p.category;

  a.appendChild(img);
  a.appendChild(title);
  a.appendChild(sub);
  return a;
}

(async function init() {
  try {
    const grid = document.getElementById("projectGrid");
    const projects = await loadProjects();
    projects.forEach(p => grid.appendChild(makeCard(p)));
  } catch (e) {
    console.error(e);
    const grid = document.getElementById("projectGrid");
    grid.innerHTML = `<p style="color:#666;text-align:center">Failed to load projects.</p>`;
  }
})();