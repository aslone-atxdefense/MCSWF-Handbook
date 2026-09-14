/* ============ DATA ============ */
const SECTIONS = [
  {id:"dayone",     n:"—",  t:"First two weeks", k:"checklist badge arrive check-in onboarding start day one"},
  {id:"mission",    n:"01", t:"Mission & Values", k:"vision endstate purpose innovation collaboration excellence integrity"},
  {id:"welcome",    n:"02", t:"Welcome letter",  k:"oblak averette director sea congratulations"},
  {id:"conduct",    n:"03", t:"Code of Conduct", k:"contractor government gs ctr far ucmj cameras punctual professionalism"},
  {id:"appearance", n:"04", t:"Appearance",      k:"uniform marpat mccuu dress civilian attire formal business casual roughs grooming hoodie"},
  {id:"fitness",    n:"05", t:"Fitness & Medical", k:"pft cft ppft pcft tricare mctims separation bcp map medical readiness"},
  {id:"discipline", n:"06", t:"Discipline & Academics", k:"accountability leave liberty dismissal release remediation 0830 0845 0930 absenteeism"},
  {id:"tracks",     n:"07", t:"Training tracks", k:"sde software development engineer product manager designer curriculum grading exams accelerator"},
  {id:"onsite",     n:"08", t:"Onsite & logistics", k:"innovation tower parking garage gym badge swag offsite austin red river"},
  {id:"tad",        n:"09", t:"Temporary duty",  k:"tad dts conops travel sharepoint tracker director approval"},
  {id:"resources",  n:"10", t:"Resources",       k:"books reading cs50 odin boot.dev bah housing childcare schools links tricare capmetro"},
  {id:"directory",  n:"11", t:"Directory",       k:"contacts phone email ortiz oblak averette slone references mco far"}
];

const CHECKS = [
  {id:"badge",   t:"Collect your building badge",         d:"Issued on day one. Opens the garage, the B1 gym, and Suite 540.", w:"Day 1"},
  {id:"marpat",  t:"Stage woodland MARPAT",               d:"MCCUU is required every Monday and the first workday after any liberty period.", w:"Day 1"},
  {id:"acct",    t:"Learn your accountability chain",     d:"Know who you report to and whether your deadline is 0830 or 0845.", w:"Day 1"},
  {id:"hours",   t:"Confirm your team's working hours",   d:"By team agreement: 0730–1530 or 0830–1630.", w:"Week 1"},
  {id:"tricare", t:"Verify TRICARE Remote enrollment",    d:"Yours and your dependents'. Raise any issue to the SEA immediately.", w:"Week 1"},
  {id:"gym",     t:"Check out the B1 gym",                d:"Lockers, showers and towels provided. Badge access only.", w:"Week 1"},
  {id:"dts",     t:"Confirm your DTS profile is current", d:"You will need it before your first TAD CONOPS is approved.", w:"Week 1"},
  {id:"pft",     t:"Know your PFT/CFT window",            d:"Annual PFT and CFT are required. Failure carries promotion restriction.", w:"Week 2"},
  {id:"swag",   t:"Order MCSWF swag",                     d:"Then tell Amber Slone so she can track the order.", w:"Week 2"},
  {id:"read",    t:"Start one primary curriculum",        d:"Boot.dev, The Odin Project, MDN, or Full Stack Open — pick one and work it.", w:"Week 2"}
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

const TRACKS = {
  sde:{
    lede:"Prepares you for a Software Development Engineer seat on a balanced product team — designing a product from an engineering perspective and programming the solution.",
    stack:["CLI","Pair programming","Java fundamentals","Object-oriented programming","Test-driven development","Databases","JavaScript fundamentals","Asynchronous code","HTML & CSS","React","Agile","Docker","Deployment","Evolutionary architecture","Containerizing applications","Manual & automatic scaling","Liveness probes","CI/CD"],
    sec:["Injection","Broken authentication","Sensitive data exposure","Security misconfiguration","Cross-site scripting (XSS)","Insecure deserialization","Components with known vulnerabilities"],
    mods:[
      ["Database design & management","The relational model and SQL; OLTP systems compared to distributed DBMS and data warehousing; web databases; Oracle DBMS in lectures and labs."],
      ["Object-oriented programming with Java","Writing, testing and debugging intermediate OO programs; data models and schemas; prototypes; subsystems and interfaces; unit testing and integration; defining system and software requirements."],
      ["Advanced web authoring","Perl scripts, CGI, database interaction and ASP; progressively complex sites in HTML, CSS, JavaScript, PHP and MySQL; ASP.NET caching, web services and configuration."],
      ["HTML, CSS & JavaScript","HTML, XHTML, DHTML, CSS and JavaScript; data types; hyperlinks, images, lists, tables and forms; debugging; control structures; arrays and the DOM."],
      ["Project management","Best practices, objectives, processes, tools and techniques; managing integration, scope, time, cost and quality; risk and procurement; analyzing real project cases."]
    ],
    grade:[["Exams (3, including a final)","200"],["Quizzes / practice assignments","100"],["Lab assignments","100"],["Development project — Loan Calculator","100"]],
    total:"500",
    scale:[["A","90–100%"],["B","80–89%"],["C","70–79%"],["D","60–69%"],["F","59% and below"]],
    note:"Development Fridays: you build a Loan Calculator across the term. Textbook is <em>Starting Out with Python</em> (Gaddis, 5th ed.), available through Blackboard."
  },
  pm:{
    lede:"Covers product management and design end-to-end: PM basics, design basics, visual and UI design principles, collaborative leadership, and tooling.",
    stack:["UX design","Design ideation","Product design","Design research","Information architecture","Visual design","UI design 1 & 2","Interaction design","Responsive design","Figma","Design systems","Tailwind CSS","Story mapping","Jobs to be Done","Product roadmaps","Backlog management"],
    sec:["Design ethics","Accessibility — 508 / WCAG","Balanced team collaboration"],
    mods:[
      ["UX design","Storytelling, ideation, user research and interaction design; information architecture, product strategy and best practice; creating user-centered experiences and presenting design decisions."],
      ["Design research","Generative and evaluative research methods; user interviews, usability testing and analysis; presenting data and recommendations."],
      ["Visual & UI design","Visual language for digital environments; universal principles, typography and color theory; style guides and pattern libraries; navigation, forms, data display and feedback patterns; micro-interactions, UX writing and conversational interfaces."],
      ["Interaction design","The role of psychology in design — cognition, perception and memory; designing and testing interactions that motivate user behavior."],
      ["Collaborative leadership","Comparing the Military Decision Making Process (MDMP) with the Double Diamond UX framework; sketchnoting and visual facilitation; ethical standards in UX and PM."]
    ],
    rubric:[
      ["0","Not turned in","Late assignments are not graded. Contact your professor in advance if you may miss a deadline."],
      ["1","Resubmit","Lacks foundational understanding, with multiple areas for improvement."],
      ["2","Resubmit","Shows foundational understanding with some areas for improvement."],
      ["3","Passed","Shows foundational understanding and fulfills requirements. Use the feedback to level up."],
      ["4","Good","Shows solid understanding and implementation of the concept."],
      ["5","Exceeds","Shows superior understanding and senior-level implementation."]
    ],
    note:"Submit assignments in Blackboard as links to Google Drive documents. Feedback lands within 48–72 hours — focus on the feedback, not the score. Resubmissions are due within 72 hours and you may resubmit <strong>no more than twice per assignment</strong>; excessive use may result in counseling, additional assignments, or required tutoring."
  }
};

const STEPS = [
  ["Complete a Mock DTS","Source data — do not submit","Before drafting a CONOPS, you complete a Mock DTS to capture the 5 Ws and a realistic cost estimate. This is the source data for the CONOPS template. <strong>Do not submit into DTS before Director approval.</strong>"],
  ["Build and submit the TAD CONOPS","NLT 30 calendar days before travel","Using the Mock DTS data, complete the MCSWF TAD CONOPS Template and its companion slide deck, and submit to the Director no later than 30 calendar days before the travel start date."],
  ["Director review &amp; approval","Normally within 5 business days","The Director reviews the CONOPS and either approves or disapproves it. A disapproved CONOPS comes back to you with the reason documented, so it can be revised and resubmitted."],
  ["Log to the SharePoint TAD Tracker","Within 2 business days of approval","Once approved, log the trip in the MCSWF TAD Tracker, attaching or referencing the signed CONOPS."],
  ["Submit in DTS","After steps 1–4 are complete","With the CONOPS approved and the Tracker updated, complete the official travel authorization in DTS."]
];

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

/* ============ CHECKLIST ============ */
const KEY = 'mcswf.checkin.v1';
let state = {};
try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { state = {}; }
function persist(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

const clItems = document.getElementById('clItems');
clItems.innerHTML = CHECKS.map(c =>
  '<label class="cl-item" for="ck-'+c.id+'">' +
    '<input type="checkbox" id="ck-'+c.id+'" data-id="'+c.id+'">' +
    '<span class="cl-body"><b>'+c.t+'</b><span>'+c.d+'</span></span>' +
    '<span class="cl-when">'+c.w+'</span>' +
  '</label>'
).join('');

const fill = document.getElementById('clFill'), count = document.getElementById('clCount');
function paint(){
  let done = 0;
  clItems.querySelectorAll('input').forEach(i => {
    const on = !!state[i.dataset.id];
    i.checked = on;
    i.closest('.cl-item').classList.toggle('done', on);
    if (on) done++;
  });
  fill.style.width = (done / CHECKS.length * 100) + '%';
  count.textContent = done + ' / ' + CHECKS.length;
}
clItems.addEventListener('change', e => {
  if (e.target.matches('input')) { state[e.target.dataset.id] = e.target.checked; persist(); paint(); }
});
document.getElementById('clReset').addEventListener('click', () => { state = {}; persist(); paint(); });
paint();

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

/* ============ TRACKS ============ */
const trackPanel = document.getElementById('trackPanel');
function chips(arr){
  return '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">' +
    arr.map(x => '<span class="ref">'+x+'</span>').join('') + '</div>';
}
function paintTrack(k){
  const t = TRACKS[k];
  let grading;
  if (k === 'sde') {
    grading =
      '<h3 class="sub-h">Assessment &amp; grading</h3><div class="tbl-scroll"><table>' +
      '<thead><tr><th>Component</th><th style="width:92px;text-align:right">Points</th></tr></thead><tbody>' +
      t.grade.map(r => '<tr><td><b>'+r[0]+'</b></td><td class="num" style="text-align:right">'+r[1]+'</td></tr>').join('') +
      '<tr><td><b>Total</b></td><td class="num" style="text-align:right"><b>'+t.total+'</b></td></tr>' +
      '</tbody></table></div>' +
      '<div class="tbl-scroll" style="margin-top:14px"><table><thead><tr><th>Grade</th><th>Percentage</th></tr></thead><tbody>' +
      t.scale.map(r => '<tr><td><b>'+r[0]+'</b></td><td class="num">'+r[1]+'</td></tr>').join('') +
      '</tbody></table></div>';
  } else {
    grading =
      '<h3 class="sub-h">Assessment &amp; grading</h3><div class="tbl-scroll"><table>' +
      '<thead><tr><th style="width:52px">Score</th><th style="width:118px">Verdict</th><th>Meaning</th></tr></thead><tbody>' +
      t.rubric.map(r => '<tr><td class="num"><b>'+r[0]+'</b></td><td><b>'+r[1]+'</b></td><td>'+r[2]+'</td></tr>').join('') +
      '</tbody></table></div>';
  }

  trackPanel.innerHTML =
    '<p class="panel-lede">'+t.lede+'</p>' +
    '<h4 class="min-h">What you will work in</h4>' + chips(t.stack) +
    '<h4 class="min-h">' + (k === 'sde' ? 'Security topics covered' : 'Ethics &amp; accessibility') + '</h4>' + chips(t.sec) +
    '<h3 class="sub-h">Modules</h3><div class="tbl-scroll"><table><tbody>' +
      t.mods.map(m => '<tr><td style="width:210px"><b>'+m[0]+'</b></td><td>'+m[1]+'</td></tr>').join('') +
    '</tbody></table></div>' +
    grading +
    '<div class="note" style="margin-top:16px">'+t.note+'</div>' +
    '<h3 class="sub-h">Course policies</h3><ul class="list">' +
      '<li><strong>Attendance.</strong> Regular attendance is crucial. Missing classes or labs may result in being dropped from the course.</li>' +
      '<li><strong>Late assignments.</strong> A two-day grace period for lab assignments, with a 20&#37; penalty.</li>' +
      '<li><strong>Withdrawal.</strong> It is your responsibility to withdraw if necessary, and there may be financial or academic impacts.</li>' +
      '<li><strong>Incompletes.</strong> Granted only for serious extenuating circumstances, and completed by a deadline set with the instructor.</li>' +
      '<li><strong>Scholastic integrity.</strong> Plagiarism or any form of cheating results in a grade of F.</li>' +
      (k === 'pm'
        ? '<li><strong>Presentations.</strong> Reschedulable for illness, planned travel, or medical appointments — notify your professor in advance. Make-ups may fall outside regular classroom hours.</li>' +
          '<li><strong>Quizzes.</strong> Required and taken in person in the classroom. Off campus that day? Arrange an online time with your professor. Ill? Contact them as soon as possible.</li>'
        : '') +
    '</ul>' +
    '<h4 class="min-h">Instructional method</h4>' +
    '<div class="prose"><p>The course splits evenly between lectures and labs — half the class learning theory, half applying it. Coursework is supported via Blackboard, where you access slide decks, assignments, and grades.</p></div>';
}
document.querySelectorAll('[data-t]').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('[data-t]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    paintTrack(b.dataset.t);
  });
});
paintTrack('sde');

/* ============ TAD STEPPER ============ */
const stepsEl = document.getElementById('steps');
stepsEl.innerHTML = STEPS.map((s, i) =>
  '<div class="step' + (i === 0 ? ' open' : '') + '">' +
    '<button class="step-btn" aria-expanded="'+(i===0)+'" aria-controls="sd'+i+'">' +
      '<span class="step-n">'+(i+1)+'</span>' +
      '<span class="step-t">'+s[0]+'<span>'+s[1]+'</span></span>' +
      '<span class="step-x">+</span>' +
    '</button>' +
    '<div class="step-d" id="sd'+i+'"'+(i===0?'':' hidden')+'>'+s[2]+'</div>' +
  '</div>'
).join('');
stepsEl.addEventListener('click', e => {
  const btn = e.target.closest('.step-btn');
  if (!btn) return;
  const step = btn.closest('.step'), body = step.querySelector('.step-d');
  const open = step.classList.toggle('open');
  body.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
});

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
