async function initTour() {
  const shell = document.getElementById('tourShell');
  const res = await fetch('scenes.json');
  const data = await res.json();

  let current = data.start;

  const venueNameEl = document.getElementById('venueName');
  const sceneTitleEl = document.getElementById('sceneTitle');
  const sceneNoteEl = document.getElementById('sceneNote');
  const chipsEl = document.getElementById('sceneChips');

  venueNameEl.textContent = data.venue;

  const layers = {};
  data.scenes.forEach(scene => {
    const layer = document.createElement('div');
    layer.className = 'tour-scene';
    layer.id = 'scene-' + scene.id;

    const img = document.createElement('img');
    img.src = scene.image;
    img.alt = scene.title;
    layer.appendChild(img);

    scene.hotspots.forEach(hs => {
      const btn = document.createElement('button');
      btn.className = 'hotspot';
      btn.style.left = hs.x + '%';
      btn.style.top = hs.y + '%';
      btn.innerHTML = '<span class="dot"></span><span class="label">' + hs.label + '</span>';
      btn.addEventListener('click', () => goTo(hs.target));
      layer.appendChild(btn);
    });

    shell.appendChild(layer);
    layers[scene.id] = layer;
  });

  data.scenes.forEach(scene => {
    const chip = document.createElement('button');
    chip.className = 'scene-chip';
    chip.textContent = scene.title;
    chip.dataset.id = scene.id;
    chip.addEventListener('click', () => goTo(scene.id));
    chipsEl.appendChild(chip);
  });

  function render() {
    const scene = data.scenes.find(s => s.id === current);
    Object.values(layers).forEach(l => l.classList.remove('active'));
    layers[current].classList.add('active');
    sceneTitleEl.textContent = scene.title;
    sceneNoteEl.textContent = scene.note;
    document.querySelectorAll('.scene-chip').forEach(c => {
      c.classList.toggle('current', c.dataset.id === current);
    });
  }

  function goTo(id) {
    current = id;
    render();
  }

  render();
}

initTour();

