/* ============ DATA ============ */
const SECTIONS = [
  {id:"mission",    n:"01", t:"Mission & Values", k:"vision endstate purpose innovation collaboration excellence integrity"},
  {id:"welcome",    n:"02", t:"Welcome letter",  k:"oblak averette director sea congratulations"},
  {id:"conduct",    n:"03", t:"Code of Conduct", k:"contractor government gs ctr far ucmj cameras punctual professionalism"},
  {id:"appearance", n:"04", t:"Appearance",      k:"uniform marpat mccuu dress civilian attire formal business casual roughs grooming hoodie"},
  {id:"fitness",    n:"05", t:"Fitness & Medical", k:"pft cft ppft pcft tricare mctims separation bcp map medical readiness"},
  {id:"discipline", n:"06", t:"Discipline & Academics", k:"accountability leave liberty dismissal release remediation 0830 0845 0930 absenteeism"},
  {id:"tracks",     n:"07", t:"Training track",  k:"sde software engineer java react curriculum grading exams accelerator"},
  {id:"advanced",   n:"08", t:"Advanced training", k:"product manager designer pm ux ui visual design research figma tailwind accessibility 508 wcag ethics jobs to be done story mapping roadmap"},
  {id:"onsite",     n:"09", t:"Onsite & logistics", k:"innovation tower parking garage gym badge swag offsite austin red river"},
  {id:"tad",        n:"10", t:"Temporary duty",  k:"tad dts conops travel sharepoint tracker director approval"},
  {id:"resources",  n:"11", t:"Resources",       k:"books reading cs50 odin boot.dev bah housing childcare schools links tricare capmetro"},
  {id:"directory",  n:"12", t:"Directory",       k:"contacts phone email ortiz oblak averette slone references mco far"}
];

const CONTRACTOR = {
  do:[
    "Respect the employer–employee relationship between contractors and their employees.",
    "Protect intellectual property rights when contractor work products are created or shared in the federal workplace.",
    "Identify possible conflicts by contractor personnel, including violations of the law. Be sensitive to inappropriate appearances created by close relationships, and seek legal counsel when resolving them.",
    "Safeguard sensitive information, including proprietary, Privacy Act, and source selection information.",
    "Clearly describe all contract tasks and ensure they are in scope.",
    "Maintain contact with on-site contractor personnel to assess performance and ascertain progress or delivery status. In an Integrated Process Team environment closer working relationships are needed — but ensure <strong>only the contractor's task leader assigns tasks</strong> to individual contractor personnel.",
    "Look at your situation from the contractor's perspective. Are you putting the employee in a difficult position by asking for performance above or outside the contract? Does your interaction give the perception of favoritism?",
    "Be aware of foreign disclosure limitations when working with international partners."
  ],
  dont:[
    "<strong>Become involved in the operations and policies of the contractor</strong> — selecting, recruiting, hiring or firing contractor personnel; directing, scheduling or critiquing individual contractor tasks on a continuous basis; supervising contractor personnel; or pressuring the contractor to use &ldquo;favorite&rdquo; personnel.",
    "Use government and contractor personnel interchangeably.",
    "Require &ldquo;out of scope&rdquo; work, personal services, or inherently governmental functions — there is no &ldquo;and other duties as assigned&rdquo; in a contract.",
    "Give incumbent contractors an unfair advantage by allowing access to meetings or information regarding re-competition.",
    "Solicit or accept gifts from contractor personnel, other than coffee and small food items in accordance with ethics regulations.",
    "Encourage contractor personnel to leave their workplace for a morale-building activity, ask them to volunteer to organize one, or participate in office gift giving or funds.",
    "Give only one contractor legally releasable information of commercial value. <strong>If you share it with one, you must share it with all.</strong>"
  ]
};

const DRESS = {
  formal:{
    lede:"The most formal civilian clothing type — essentially business attire, used for official or formal occasions such as meetings with high-ranking officials of the U.S. and host nation.",
    m:["Slacks","Button-up shirt with collar","Blazer or suit coat","Dress shoes complementary to the attire","Belt and socks complementary to the attire","Ties may be worn if required","All-weather jacket or overcoat optional","Hats will not be worn"],
    f:["Dress","Slacks or conservative skirt","Button-up blouse or equivalent","Blazer or suit coat","Conservative dress shoes complementary to the attire","Belt, stockings or socks as necessary","Fleece or non-military all-weather jacket optional","Conservative jewelry complementary to the attire","A handbag that complements the attire, where suitable"]
  },
  business:{
    lede:"Less formal, yet still a professional appearance. This is the MCSWF default for day-to-day work unless you are directed otherwise.",
    m:["Slacks","Jeans, with no holes or tears","Button-up shirt with collar","Shoes complementary to the attire","Belt and socks complementary to the attire","Ties may be worn if required","Fleece or non-military all-weather jacket optional","Hats will not be worn"],
    f:["Slacks, conservative skirt, or dress","Button-up blouse or equivalent","Conservative dress shoes complementary to the attire","Belt, stockings or socks as necessary","Fleece or non-military all-weather jacket optional","Jewelry that is conservative and within <span class='ref'>MCO 1020.34H</span>","A handbag that complements the attire, where suitable"]
  },
  roughs:{
    lede:"The least formal type, for missions requiring hardier clothing to withstand a physically rugged environment and activity.",
    m:["Cargo pants or tasteful jeans","Collared shirt — polo or equivalent","Fleece or non-military all-weather jacket optional","Hiking boots or equivalent","Belt and socks complementary to the attire","Hats may be worn case-by-case"],
    f:["Same as males, except the shirt may be substituted for a tasteful blouse","No spaghetti straps, tank tops, or untasteful exposure of skin"]
  }
};

/* ============ NAV ============ */
function buildNav(el){
  el.innerHTML = SECTIONS.map(s =>
    '<a href="#'+s.id+'" data-id="'+s.id+'" data-k="'+(s.t+' '+s.k).toLowerCase()+'"><em>'+s.n+'</em><span>'+s.t+'</span></a>'
  ).join('') + '<div class="rail-empty" hidden>No section matches.</div>';
}
const navD = document.getElementById('navD'), navM = document.getElementById('navM');
buildNav(navD); buildNav(navM);

const search = document.getElementById('search');
search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  navD.querySelectorAll('a').forEach(a => {
    const hit = !q || a.dataset.k.includes(q);
    a.classList.toggle('hide', !hit);
    if (hit) shown++;
  });
  navD.querySelector('.rail-empty').hidden = shown > 0;
});

const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.rail-nav a').forEach(a =>
        a.classList.toggle('on', a.dataset.id === e.target.id));
    }
  });
}, {rootMargin: '-15% 0px -70% 0px'});
SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) spy.observe(el); });

/* ---- Mobile hamburger drawer ---- */
const drawer = document.getElementById('drawer'),
      dBtn   = document.getElementById('drawerBtn'),
      topbar = document.querySelector('.topbar');

/* aria-expanded drives the bars-to-X animation in CSS, so it is set on every
   state change rather than only for screen readers. */
function setDrawer(open){
  drawer.classList.toggle('open', open);
  dBtn.setAttribute('aria-expanded', String(open));
  dBtn.setAttribute('aria-label', open ? 'Close section index' : 'Open section index');
}

dBtn.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));

/* Tapping a section closes the drawer; the href jumps to it. */
navM.addEventListener('click', e => { if (e.target.closest('a')) setDrawer(false); });

/* Escape closes it and returns focus to the button. */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) { setDrawer(false); dBtn.focus(); }
});

/* Tapping outside the drawer closes it. */
document.addEventListener('click', e => {
  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !dBtn.contains(e.target))
    setDrawer(false);
});

/* Keep the drawer pinned directly under the bar even if the title wraps. */
function measureTopbar(){
  if (topbar && topbar.offsetHeight)
    document.documentElement.style.setProperty('--topbar-h', topbar.offsetHeight + 'px');
}
measureTopbar();
window.addEventListener('resize', measureTopbar);
window.addEventListener('load', measureTopbar);

/* ============ CONTRACTOR DO / DON'T ============ */
const ddBody = document.getElementById('ddBody');
function paintDD(k){
  ddBody.innerHTML = '<ul class="list">' + CONTRACTOR[k].map(x => '<li>'+x+'</li>').join('') + '</ul>';
}
document.querySelectorAll('.dd-head button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.dd-head button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    paintDD(b.dataset.k);
  });
});
paintDD('do');

/* ============ DRESS CODE ============ */
const dressPanel = document.getElementById('dressPanel');
function paintDress(k){
  const d = DRESS[k];
  dressPanel.innerHTML =
    '<p class="panel-lede">'+d.lede+'</p>' +
    '<div class="split"><div><h4>Males</h4><ul class="list">' +
      d.m.map(x => '<li>'+x+'</li>').join('') +
    '</ul></div><div><h4>Females</h4><ul class="list">' +
      d.f.map(x => '<li>'+x+'</li>').join('') +
    '</ul></div></div>';
}
document.querySelectorAll('[data-d]').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('[data-d]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    paintDress(b.dataset.d);
  });
});
paintDress('business');

/* ============ RETURN TO TOP ============ */
(function toTop(){
  const btn = document.getElementById('toTop');
  if (!btn) return;

  /* Two-stage hide: .away fades it out, [hidden] then takes it out of the tab
     order once the transition has finished. */
  let hideTimer;
  function show(on){
    clearTimeout(hideTimer);
    if (on) { btn.hidden = false; requestAnimationFrame(() => btn.classList.remove('away')); }
    else    { btn.classList.add('away'); hideTimer = setTimeout(() => { btn.hidden = true; }, 220); }
  }
  btn.classList.add('away');

  /* Appears after roughly one screen of scrolling. */
  let ticking = false;
  function check(){
    ticking = false;
    show(window.scrollY > window.innerHeight * 0.9);
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(check); }
  }, {passive:true});
  check();

  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  btn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior: still.matches ? 'auto' : 'smooth'});
    /* Send focus back to the search field so keyboard users land where the
       page starts rather than at the bottom of the document. */
    const first = document.getElementById('search');
    if (first) first.focus({preventScroll:true});
  });
})();

/* ============ MARPAT PIXEL FIELD ============ */
(function camo(){
  const c = document.getElementById('camo');
  if (!c) return;
  const cs = getComputedStyle(document.documentElement);
  const pal = ['--camo-a','--camo-b','--camo-c','--camo-d'].map(v => cs.getPropertyValue(v).trim());
  const draw = () => {
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext('2d');
    x.scale(dpr, dpr);
    const cell = 9, cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    // coarse patch grid, then sample it per pixel-cell — patches, not TV static
    const cw = Math.ceil(cols / 5) + 1, ch = Math.ceil(rows / 5) + 1;
    const coarse = Array.from({length: cw * ch}, () => Math.floor(Math.random() * pal.length));
    for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {
        let idx = coarse[Math.floor(r / 5) * cw + Math.floor(q / 5)];
        if (Math.random() < 0.26) idx = Math.floor(Math.random() * pal.length); // edge dither
        x.fillStyle = pal[idx];
        x.fillRect(q * cell, r * cell, cell, cell);
      }
    }
  };
  draw();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(draw, 180); });
})();
