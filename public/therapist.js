
const state = {
  appointments: [
    { name: 'John Doe', datetime: '2025-11-22 10:00 AM', mode: 'In-person', status: 'Scheduled' },
    { name: 'Jane Smith', datetime: '2025-11-22 11:30 AM', mode: 'Online', status: 'Scheduled' },
    { name: 'Mike Johnson', datetime: '2025-11-22 12:30 PM', mode: 'Online', status: 'Upcoming' },
    { name: 'Lisa Brown', datetime: '2025-11-22 02:00 PM', mode: 'In-person', status: 'Upcoming' },
    { name: 'Ali Khan', datetime: '2025-11-23 09:00 AM', mode: 'In-person', status: 'Scheduled' },
    { name: 'Sara Ahmed', datetime: '2025-11-23 10:30 AM', mode: 'Online', status: 'Scheduled' },
    { name: 'Bilal R', datetime: '2025-11-23 11:30 AM', mode: 'Online', status: 'Pending' },
    { name: 'Nida S', datetime: '2025-11-24 03:00 PM', mode: 'In-person', status: 'Upcoming' }
  ],
  assessments: [
    { name: 'John', mood: 'Anxiety', score: 75 },
    { name: 'Jane', mood: 'Depression', score: 60 },
    { name: 'Mike', mood: 'Stress', score: 80 },
    { name: 'Lisa', mood: 'Anxiety', score: 70 },
    { name: 'Bilal', mood: 'Depression', score: 65 },
    { name: 'Sara', mood: 'Stress', score: 55 },
    { name: 'Nida', mood: 'Mood', score: 68 },
    { name: 'Ali', mood: 'Sleep', score: 73 }
  ],
  notes: [
    'John Doe - Discussed anxiety triggers.',
    'Jane Smith - Coping strategies for depression.',
    'Mike Johnson - Stress management.',
    'Lisa Brown - Weekly progress review.',
    'Ali Khan - Sleep hygiene tasks.',
    'Sara Ahmed - Medication review.',
    'Bilal R - Mood diary started.',
    'Nida S - Follow-up scheduled.'
  ],
  tasks: [
    'Review John Doe\'s assessment results.',
    'Prepare session plan for Jane Smith.',
    'Update intake forms for new patients.',
    'Call Sara to confirm appointment.'
  ]
};

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function showSection(sectionId) {
  $all('.section').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(sectionId);
  if (el) el.classList.add('active');

  setTimeout(()=> el && el.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}

function logout(){
  alert('Logging out (demo) — replace with real auth flow.');

}

function renderAppointments(){
  const tbody = $('#appointmentTable');
  tbody.innerHTML = '';
  state.appointments.forEach((a, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(a.name)}</td>
      <td>${escapeHtml(a.datetime)}</td>
      <td>${escapeHtml(a.mode)}</td>
      <td>${escapeHtml(a.status)}</td>
      <td>
        <button class="table-btn btn-resched" onclick="reschedule(${i})">Reschedule</button>
        <button class="table-btn btn-cancel" onclick="cancelAppointment(${i})">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  $('#appointmentsCount').innerText = state.appointments.length;
}

function reschedule(idx){
  const appt = state.appointments[idx];
  const newTime = prompt(`Enter new date & time for ${appt.name}`, appt.datetime);
  if (newTime){
    state.appointments[idx].datetime = newTime;
    renderAppointments();
    toast('Appointment rescheduled');
  }
}
function cancelAppointment(idx){
  if (confirm('Cancel appointment?')){
    state.appointments[idx].status = 'Cancelled';
    renderAppointments();
    toast('Appointment cancelled');
  }
}

function renderAssessments(){
  const grid = $('#assessmentGrid');
  grid.innerHTML = '';
  state.assessments.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${escapeHtml(a.name)} — ${escapeHtml(a.mood)}</h3>
                      <p class="small-text">Latest screening</p>
                      <div class="score-pill">${a.score}%</div>`;
    grid.appendChild(card);
  });
  $('#pendingAssessments').innerText = state.assessments.length;
  $('#totalPatients').innerText = 25; 
  $('#totalMessages').innerText = 12;
}

function renderNotes(){
  const box = $('#notesList');
  box.innerHTML = '';
  state.notes.forEach(n => {
    const d = document.createElement('div');
    d.className = 'note-card';
    d.innerHTML = `<strong>${escapeLine(n)}</strong><p class="small-text">Quick note</p>`;
    box.appendChild(d);
  });
}

function renderTasks(){
  const ul = $('#tasksList');
  ul.innerHTML = '';
  state.tasks.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    ul.appendChild(li);
  });
}

function toggleTip(id){
  const el = document.getElementById(id);
  const btns = $all('.tip-toggle');

  $all('.tip-details').forEach(d => { d.style.display = 'none'; d.setAttribute('aria-hidden','true'); });
  btns.forEach(b => b.setAttribute('aria-expanded','false'));

  if (el){
    const visible = el.style.display === 'block';
    if (!visible){
      el.style.display = 'block';
      el.setAttribute('aria-hidden','false');
      const btn = el.previousElementSibling;
      if (btn) btn.setAttribute('aria-expanded','true');
    } else {
      el.style.display = 'none';
      el.setAttribute('aria-hidden','true');
      const btn = el.previousElementSibling;
      if (btn) btn.setAttribute('aria-expanded','false');
    }
  }
}

function createMessageElement(html, who='me'){
  const div = document.createElement('div');
  div.className = 'message ' + (who === 'me' ? 'me' : 'other');
  div.innerHTML = html;
  return div;
}

function sendMessage(){
  const input = $('#chatInput');
  const persona = $('#personaSelect').value;
  const txt = input.value.trim();
  if (!txt) return;
  const chat = $('#chatMessages');

  if (persona === 'therapist'){
    chat.appendChild(createMessageElement(`<strong>You:</strong> ${escapeHtml(txt)}`, 'me'));
    input.value=''; chat.scrollTop = chat.scrollHeight;
    return; 
  }

  chat.appendChild(createMessageElement(`<strong>Patient:</strong> ${escapeHtml(txt)}`, 'other'));
  input.value=''; chat.scrollTop = chat.scrollHeight;

  const reply = generateReply(txt);

  setTimeout(()=> {
    chat.appendChild(createMessageElement(`<strong>You:</strong> ${escapeHtml(reply)}`, 'me'));
    chat.scrollTop = chat.scrollHeight;
  }, 600);
}

function generateReply(userText){
  const txt = userText.toLowerCase();
  // greetings
  if (/\b(hi|hello|hey|salam|assalam)\b/.test(txt)) return "Hello — how are you feeling today?";
  if (/\b(how are you|how r u|how u)\b/.test(txt)) return "I'm here to listen. How would you describe how you're feeling right now?";
  // if user says feeling anxious
  if (/\banxious\b|\banxiety\b|\bpanic\b/.test(txt)) return "I'm sorry you're feeling anxious — can you tell me what triggered it or when it started?";
  if (/\b(depress|depressed|sad|hopeless)\b/.test(txt)) return "I'm really sorry you're feeling low. Would you like to talk about what's causing these feelings?";
  if (/\bstress\b|\bstressed\b/.test(txt)) return "Stress can be overwhelming. Have you tried short breathing exercises or a 5-minute walk?";
  if (/\bsleep\b|\bsleeping\b|\binsomnia\b/.test(txt)) return "Sleep issues are common — what time do you usually go to bed and wake up?";
  if (/\bthank\b|\bthanks\b|\bthx\b/.test(txt)) return "You're welcome — I'm here whenever you need to talk.";
  if (/\b(ok|okay|fine|better)\b/.test(txt)) return "Glad to hear that. Would you like a few tips to keep feeling better?";
  if (/\b(help|support|suicid)\b/.test(txt)) return "If you are in danger or having thoughts of harming yourself, please call local emergency services right now. If not, tell me more and we can plan next steps together.";

  if (/\b(why|what|how|when|where)\b/.test(txt)) return "That's an important question — can you say more so I can understand better?";
 
  const fallbackReplies = [
    "I hear you — can you tell me more?",
    "Thank you for sharing that. How long have you felt this way?",
    "That sounds difficult. What helps you cope a little right now?"
  ];

  return fallbackReplies[Math.min(userText.length % fallbackReplies.length, fallbackReplies.length - 1)];
}

document.addEventListener('click', function(e){
  if (e.target && e.target.id === 'sendBtn') sendMessage();
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'chatInput'){
    e.preventDefault(); sendMessage();
  }
});

function saveProfile(){
  const name = $('#profileName').value.trim();
  const specialty = $('#profileSpecialty').value.trim();
  $('#profileDisplayName').innerText = name || 'Dr';
  $('#profileDisplaySpecialty').innerText = specialty || '';
  toast('Profile saved (demo)');
}
function resetProfile(){
  $('#profileName').value = 'Dr. Alisha';
  $('#profileSpecialty').value = 'Mental Health, Anxiety, Depression';
  $('#profileEmail').value = 'alisha@example.com';
  $('#profilePhone').value = '+92 300 1234567';
  $('#profileBio').value = 'Experienced therapist specializing in mental health support and patient care.';
  $('#avatarCircle').innerText = 'AI';
  toast('Profile reset');
}

function toast(msg){
  const t = document.createElement('div');
  t.style.position = 'fixed'; t.style.bottom = '24px'; t.style.left = '50%';
  t.style.transform = 'translateX(-50%)'; t.style.background = 'rgba(20,30,50,0.94)';
  t.style.color = '#fff'; t.style.padding = '10px 14px'; t.style.borderRadius = '10px';
  t.style.zIndex = 9999; t.style.boxShadow = '0 8px 24px rgba(14,20,40,0.18)';
  t.innerText = msg; document.body.appendChild(t);
  setTimeout(()=> { t.style.transition='opacity .3s'; t.style.opacity = 0; }, 1400);
  setTimeout(()=> t.remove(), 1800);
}

function drawSqueezedBarChart(canvasId, labels, values){
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const padding = 40;
  const chartW = canvas.width - padding*2;
  const chartH = canvas.height - padding*1.6;
  const maxVal = Math.max(...values, 100);
  const barGap = 10;
  const barW = (chartW - (values.length - 1) * barGap) / values.length;
  ctx.font = '12px Arial';
  labels.forEach((lbl,i) => {
    const val = values[i];
    const x = padding + i*(barW + barGap);
    const barH = (val / maxVal) * chartH;
    const y = padding + (chartH - barH);
  
    const g = ctx.createLinearGradient(x, y, x + barW, y + barH);
    g.addColorStop(0, '#4a90e2'); g.addColorStop(1, '#2f4fb3');
    ctx.fillStyle = g;
  
    const innerBarW = Math.max(20, barW * 0.78);
    const offsetX = x + (barW - innerBarW) / 2;
    ctx.fillRect(offsetX, y, innerBarW, barH);

    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    ctx.fillText(lbl, offsetX + innerBarW / 2, padding + chartH + 18);

    ctx.fillStyle = '#05315a';
    ctx.fillText(val + '%', offsetX + innerBarW / 2, y - 8);
  });
}

function drawOverview(){
  const labels = state.assessments.slice(0,6).map(a => a.name);
  const values = state.assessments.slice(0,6).map(a => a.score);
  drawSqueezedBarChart('overviewChart', labels, values);
}
function drawBigChart(){
  const labels = state.assessments.map(a => a.name);
  const values = state.assessments.map(a => a.score);
  drawSqueezedBarChart('barChart', labels, values);
}

function makeDraggableByHandle(handleId, containerId){
  const handle = document.getElementById(handleId);
  const container = document.getElementById(containerId);
  if (!handle || !container) return;
  let dragging = false; let startX=0, startY=0, origLeft=0, origTop=0;
  handle.addEventListener('pointerdown', (ev) => {
    ev.preventDefault();
    dragging = true;
    handle.setPointerCapture(ev.pointerId);
    startX = ev.clientX; startY = ev.clientY;

    const rect = container.getBoundingClientRect();
    origLeft = rect.left; origTop = rect.top;

    container.style.position = 'absolute';
    container.style.zIndex = 888;
    container.style.left = origLeft + 'px';
    container.style.top = origTop + 'px';
    container.style.transition = 'none';
  });
  window.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    container.style.left = (origLeft + dx) + 'px';
    container.style.top = (origTop + dy) + 'px';
  });
  window.addEventListener('pointerup', (ev) => {
    if (!dragging) return;
    dragging = false;
    try { handle.releasePointerCapture(ev.pointerId); } catch(e) {}

    const rect = container.getBoundingClientRect();
    if (rect.left < 0 || rect.top < 0 || rect.right > window.innerWidth) {
      container.style.position = ''; container.style.left = ''; container.style.top = ''; container.style.zIndex = ''; container.style.transition = '';
    } else {

      container.style.transition = 'left .15s, top .15s';
    }
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function escapeLine(s){ return escapeHtml(s); }

window.addEventListener('DOMContentLoaded', () => {
  renderAppointments(); renderAssessments(); renderNotes(); renderTasks();
  toggleTip(''); 
  drawOverview(); drawBigChart();

  document.getElementById('followups').innerText = '2';
  document.getElementById('completedToday').innerText = '3';
  document.getElementById('newRegs').innerText = '1';

  makeDraggableByHandle('dragOverviewHandle','overviewDraggable');
 
  makeDraggableByHandle('dragChartHandle','overviewChartCard');

  makeDraggableByHandle('dragChartHandle','chartsCard');

  document.querySelectorAll('.tip-toggle').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  $('#personaSelect').value = 'patient';
});


