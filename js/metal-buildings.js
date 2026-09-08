// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===================================================================
// Interactive "Design Your Own Metal Building" configurator.
// This is the widget a contractor's own site would embed for
// homeowners. Everything here (geometry + pricing) is illustrative —
// swap BASE_RATES for a contractor's real numbers before going live.
// ===================================================================
(function(){
  const svg = document.getElementById('buildingSvg');
  if (!svg) return; // page has no configurator (e.g. thank-you page)

  const state = {
    type: 'garage',
    width: 30,
    length: 40,
    height: 10,
    roof: 'gable',
    wall: '#c9cdd1',
    roofColor: '#3b3f42',
    trim: '#ffffff'
  };

  const BASE_RATES = { garage: 18, barn: 19, workshop: 20, carport: 14, commercial: 24 };

  // ---------- Controls ----------
  const typePills = document.querySelectorAll('[data-type]');
  const roofPills = document.querySelectorAll('[data-roof]');
  const wallSwatches = document.querySelectorAll('[data-wall]');
  const roofSwatches = document.querySelectorAll('[data-roofcolor]');
  const trimSwatches = document.querySelectorAll('[data-trim]');
  const widthInput = document.getElementById('widthRange');
  const lengthInput = document.getElementById('lengthRange');
  const heightInput = document.getElementById('heightRange');
  const widthOut = document.getElementById('widthOut');
  const lengthOut = document.getElementById('lengthOut');
  const heightOut = document.getElementById('heightOut');
  const dimsReadout = document.getElementById('dimsReadout');
  const priceValue = document.getElementById('priceValue');
  const quoteSummary = document.getElementById('quoteSummary');

  function setPressed(nodeList, matchValue, attr){
    nodeList.forEach(el => el.setAttribute('aria-pressed', el.dataset[attr] === matchValue ? 'true' : 'false'));
  }

  typePills.forEach(btn => btn.addEventListener('click', () => {
    state.type = btn.dataset.type;
    setPressed(typePills, state.type, 'type');
    render();
  }));
  roofPills.forEach(btn => btn.addEventListener('click', () => {
    state.roof = btn.dataset.roof;
    setPressed(roofPills, state.roof, 'roof');
    render();
  }));
  wallSwatches.forEach(btn => btn.addEventListener('click', () => {
    state.wall = btn.dataset.wall;
    setPressed(wallSwatches, state.wall, 'wall');
    render();
  }));
  roofSwatches.forEach(btn => btn.addEventListener('click', () => {
    state.roofColor = btn.dataset.roofcolor;
    setPressed(roofSwatches, state.roofColor, 'roofcolor');
    render();
  }));
  trimSwatches.forEach(btn => btn.addEventListener('click', () => {
    state.trim = btn.dataset.trim;
    setPressed(trimSwatches, state.trim, 'trim');
    render();
  }));

  [ [widthInput,'width'], [lengthInput,'length'], [heightInput,'height'] ].forEach(([el,key]) => {
    if (!el) return;
    el.addEventListener('input', () => { state[key] = Number(el.value); render(); });
  });

  // ---------- Geometry helpers ----------
  const clamp = (v,min,max) => Math.max(min, Math.min(max, v));
  const ftToFrontPx = w => clamp(140 + (w-20)*2.2, 140, 320);
  const ftToHeightPx = h => clamp(70 + (h-8)*7, 70, 160);
  const ftToDepthPx = l => clamp(50 + (l-20)*0.7, 50, 130);

  function poly(points){ return points.map(p => p.join(',')).join(' '); }

  function renderBuilding(){
    const frontW = ftToFrontPx(state.width);
    const hPx = ftToHeightPx(state.height);
    const depth = ftToDepthPx(state.length);
    const ox = depth * 0.55, oy = -depth * 0.32;
    const baseX = 60, baseY = 330;
    const isOpen = state.type === 'carport';

    const roofRise = state.roof === 'gable' ? frontW * 0.20 : frontW * 0.14;

    const fl = [baseX, baseY];
    const fr = [baseX+frontW, baseY];
    const flTop = [baseX, baseY-hPx];
    const frTop = [baseX+frontW, baseY-hPx];
    const blTop = [baseX+ox, baseY-hPx+oy];
    const brTop = [baseX+frontW+ox, baseY-hPx+oy];
    const bl = [baseX+ox, baseY+oy];
    const br = [baseX+frontW+ox, baseY+oy];

    let roofSvg = '', gableEnd = '';
    if (state.roof === 'gable'){
      const apexF = [baseX+frontW/2, baseY-hPx-roofRise];
      const apexB = [apexF[0]+ox, apexF[1]+oy];
      roofSvg = `
        <polygon points="${poly([flTop, blTop, apexB, apexF])}" fill="${state.roofColor}" stroke="${state.trim}" stroke-width="2"/>
        <polygon points="${poly([apexF, apexB, brTop, frTop])}" fill="${shade(state.roofColor,-14)}" stroke="${state.trim}" stroke-width="2"/>
        <line x1="${apexF[0]}" y1="${apexF[1]}" x2="${apexB[0]}" y2="${apexB[1]}" stroke="${state.trim}" stroke-width="1.5" opacity=".6"/>`;
      if (!isOpen){
        gableEnd = `<polygon points="${poly([flTop, apexF, frTop])}" fill="${shade(state.wall,-6)}" stroke="${state.trim}" stroke-width="1.5"/>`;
      }
    } else {
      const highF = [baseX+frontW, baseY-hPx-roofRise];
      const highB = [highF[0]+ox, highF[1]+oy];
      roofSvg = `
        <polygon points="${poly([flTop, blTop, highB, highF])}" fill="${state.roofColor}" stroke="${state.trim}" stroke-width="2"/>`;
    }

    let wallsSvg = '';
    if (!isOpen){
      wallsSvg = `
        <polygon points="${poly([fl, fr, frTop, flTop])}" fill="${state.wall}" stroke="${state.trim}" stroke-width="2"/>
        <polygon points="${poly([fr, br, brTop, frTop])}" fill="${shade(state.wall,-10)}" stroke="${state.trim}" stroke-width="2"/>`;
      // wall ribs (front face)
      const ribs = [];
      const ribCount = Math.round(frontW/26);
      for (let i=1;i<ribCount;i++){
        const x = baseX + (frontW/ribCount)*i;
        ribs.push(`<line x1="${x}" y1="${baseY}" x2="${x}" y2="${baseY-hPx}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`);
      }
      wallsSvg += ribs.join('');
      // door + window
      const doorW = 46, doorH = 78;
      const doorX = baseX + frontW*0.14;
      wallsSvg += `<rect x="${doorX}" y="${baseY-doorH}" width="${doorW}" height="${doorH}" fill="${shade(state.wall,-24)}" stroke="${state.trim}" stroke-width="2"/>`;
      const winSize = 34;
      const winX = baseX + frontW*0.62;
      wallsSvg += `<rect x="${winX}" y="${baseY-hPx*0.62}" width="${winSize}" height="${winSize}" fill="#8fb3c7" stroke="${state.trim}" stroke-width="2"/>`;
    } else {
      // open carport: corner posts only
      const posts = [fl, fr, bl, br];
      wallsSvg = posts.map(p => `<rect x="${p[0]-4}" y="${p[1]-hPx}" width="8" height="${hPx}" fill="${state.trim==='#ffffff'?'#8a8f93':state.trim}"/>`).join('');
    }

    svg.innerHTML = `
      <rect x="0" y="330" width="600" height="6" fill="rgba(0,0,0,.25)"/>
      ${wallsSvg}
      ${roofSvg}
      ${gableEnd}
    `;
  }

  function shade(hex, percent){
    const n = parseInt(hex.replace('#',''), 16);
    let r = (n>>16)+Math.round(2.55*percent);
    let g = ((n>>8)&0xff)+Math.round(2.55*percent);
    let b = (n&0xff)+Math.round(2.55*percent);
    r = clamp(r,0,255); g = clamp(g,0,255); b = clamp(b,0,255);
    return `rgb(${r},${g},${b})`;
  }

  function renderPrice(){
    const sqft = state.width * state.length;
    const heightFactor = 1 + Math.max(0, state.height-10) * 0.015;
    const roofFactor = state.roof === 'gable' ? 1.05 : 1.0;
    const rate = BASE_RATES[state.type];
    const low = Math.round((sqft*rate*heightFactor*roofFactor*0.9)/100)*100;
    const high = Math.round((sqft*rate*heightFactor*roofFactor*1.15)/100)*100;
    const fmt = n => '$' + n.toLocaleString('en-US');
    if (priceValue) priceValue.textContent = `${fmt(low)} – ${fmt(high)}`;
    if (dimsReadout) dimsReadout.textContent = `${state.width} ft × ${state.length} ft × ${state.height} ft — ${sqft.toLocaleString('en-US')} sq ft`;

    const typeLabel = { garage:'Garage', barn:'Barn', workshop:'Workshop', carport:'Carport', commercial:'Commercial Building' }[state.type];
    const roofLabel = state.roof === 'gable' ? 'Gable (A-Frame)' : 'Single-Slope';
    if (quoteSummary){
      quoteSummary.value = `${typeLabel} — ${state.width}x${state.length}x${state.height} ft, ${roofLabel} roof. Estimated: ${fmt(low)}-${fmt(high)}.`;
    }
  }

  function render(){
    if (widthOut) widthOut.textContent = state.width;
    if (lengthOut) lengthOut.textContent = state.length;
    if (heightOut) heightOut.textContent = state.height;
    renderBuilding();
    renderPrice();
  }

  render();

  // "Get My Free Quote" scrolls to the lead form with the config pre-filled
  const quoteBtn = document.getElementById('getQuoteBtn');
  if (quoteBtn){
    quoteBtn.addEventListener('click', () => {
      const target = document.getElementById('get-started');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

// ===================================================================
// Lead form — no backend wired up yet. Point LEAD_ENDPOINT_URL at a
// GHL form action / Zapier webhook / your CRM's endpoint, or swap
// this whole block for a GHL survey iframe embed like index.html uses.
// ===================================================================
(function(){
  const LEAD_ENDPOINT_URL = ''; // e.g. 'https://services.leadconnectorhq.com/hooks/xxxx'
  const form = document.getElementById('leadForm');
  if (!form) return;
  const successPanel = document.getElementById('formSuccess');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (LEAD_ENDPOINT_URL){
      fetch(LEAD_ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      }).catch(() => {});
    }
    form.style.display = 'none';
    if (successPanel) successPanel.style.display = 'block';
  });
})();
