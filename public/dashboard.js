/* ======== FINAL DASHBOARD.JS – SAFE + 100% WORKING ======== */
document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

 
  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Section switching function
  function showSection(sectionId) {
    const allSections = document.querySelectorAll(".content-section");
    if (!allSections) return;

    allSections.forEach(sec => sec.classList.remove("active"));

    const target = document.getElementById(sectionId);
    if (target) target.classList.add("active");

    document.querySelectorAll(".sidebar li").forEach(li => {
      li.classList.remove("active");
      if (li.getAttribute("data-section") === sectionId) {
        li.classList.add("active");
      }
      
    });

    if (sidebar) sidebar.classList.remove("open");
  }

  // Click event on sidebar items
  const menuItems = document.querySelectorAll(".sidebar li");
  if (menuItems) {
    menuItems.forEach(li => {
      li.addEventListener("click", () => {
        const section = li.getAttribute("data-section");
        showSection(section);
      });
    });
  }

  showSection("home");

  // Logout
  window.logout = function () {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      alert("Logged out successfully!");
    }
  };

});
const articles = [
    {
        title: "5 Healthy Ways to Release Anger",
        category: "Articles",
        readTime: "2 min read",
        image: "anger.png",
    },
    {
        title: "How to Reduce Anxiety in 60 Seconds",
        category: "Mental Health",
        readTime: "3 min read",
        image: "anxiety.png",
    },
    {
        title: "7 Morning Habits to Feel Happier",
        category: "Lifestyle",
        readTime: "4 min read",
        image: "morning.png",
    },
    {
        title: "How to Stop Overthinking",
        category: "Mindfulness",
        readTime: "3 min read",
        image: "overthinking.png",
    },
    {
        title: "Breathing Exercise for Instant Calm",
        category: "Breath",
        readTime: "2 min read",
        image: "breath.png",
    },
];
function getRandomArticles(count = 2) {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function loadArticles() {
    const dailyArticles = getRandomArticles(2);
    const section = document.getElementById("articlesSection");

    section.innerHTML = "";

    dailyArticles.forEach(a => {
        section.innerHTML += `
            <div class="article-card">
                <h3>${a.title}</h3>
                <p class="cat">${a.category} • ${a.readTime}</p>
            </div>
        `;
    });
}

loadArticles();
document.getElementById("courses").addEventListener("click", function() {
    window.location.href = "courses.html";
});

/* ================= homepage ================= */
// dashboard.js
// Basic demo data and UI wiring. Replace data fetches with your API calls.

document.addEventListener('DOMContentLoaded', () => {
  const user = {
    name: "Ayesha",
    avatarText: "A",
    memberSince: "Nov 12, 2024",
    nextAppointment: {
      exists: true,
      therapist: "Dr. Sana Khan",
      date: "Nov 23, 2025",
      time: "11:00 AM"
    },
    todaysMood: null, // or {score:7, note:"Felt okay"}
    pendingCourse: { title: "CBT Basics - Lesson 4", progress: 62 },
    activities: [
      { text: "Completed Lesson 3 of CBT Basics", when: "2 days ago" },
      { text: "Mood logged: 6/10", when: "3 days ago" },
      { text: "Booked appointment with Dr. Sana", when: "5 days ago" }
    ],
    notifications: [
      { text: "Appointment reminder: Nov 23, 11:00 AM", unread: true },
      { text: "New message from Dr. Sana", unread: true },
      { text: "Course 'CBT Basics' updated", unread: false }
    ],
    tips: [
      "Try 5 minutes breathing exercise — inhale for 4, hold 4, exhale 6.",
      "Short walk outside can boost mood — aim 10 minutes.",
      "Write one thing you're grateful for today."
    ],
    moodConsistencyPercent: 40 // for progress bar
  };

  // Fill header / welcome
  document.getElementById('welcomeText').innerText = `Welcome back, ${user.name}!`;
  document.getElementById('avatar').innerText = user.avatarText;
  document.getElementById('memberSince').innerText = user.memberSince;
  document.getElementById('todayDate').innerText = new Date().toLocaleDateString();

  // Today summary
  const nextAppointmentEl = document.getElementById('nextAppointment');
  if (user.nextAppointment && user.nextAppointment.exists) {
    nextAppointmentEl.innerText = `${user.nextAppointment.therapist} • ${user.nextAppointment.date} • ${user.nextAppointment.time}`;
  } else {
    nextAppointmentEl.innerText = "No upcoming";
  }

  const todaysMoodEl = document.getElementById('todaysMood');
  if (user.todaysMood) {
    todaysMoodEl.innerText = `${user.todaysMood.score}/10 — ${user.todaysMood.note || ''}`;
  } else {
    todaysMoodEl.innerHTML = `<button class="pill" onclick="handleQuick('mood')">Log mood now</button>`;
  }

  // Pending course
  const pendingCourseEl = document.getElementById('pendingCourse');
  if (user.pendingCourse) {
    pendingCourseEl.innerText = `${user.pendingCourse.title} • ${user.pendingCourse.progress}%`;
    document.getElementById('coursePercent').innerText = `${user.pendingCourse.progress}%`;
    document.getElementById('courseFill').style.width = `${user.pendingCourse.progress}%`;
  } else {
    pendingCourseEl.innerText = "None";
  }

  // Activities
  const activityRoot = document.getElementById('recentActivity');
  activityRoot.innerHTML = '';
  user.activities.forEach(a => {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `<div style="display:flex; justify-content:space-between;"><div>${a.text}</div><div class="small-muted" style="font-size:12px">${a.when}</div></div>`;
    activityRoot.appendChild(div);
  });

  // Notifications
  const notifRoot = document.getElementById('notifications');
  notifRoot.innerHTML = '';
  user.notifications.forEach(n => {
    const d = document.createElement('div');
    d.className = 'tip-item';
    d.style.display = 'flex';
    d.style.justifyContent = 'space-between';
    d.innerHTML = `<div>${n.text}</div><div class="small-muted" style="font-size:12px">${n.unread ? 'New' : ''}</div>`;
    notifRoot.appendChild(d);
  });

  // Tips
  const tipsRoot = document.getElementById('tipsList');
  tipsRoot.innerHTML = '';
  user.tips.forEach(t => {
    const d = document.createElement('div');
    d.className = 'tip-item';
    d.innerText = t;
    tipsRoot.appendChild(d);
  });

  // Progress bars
  document.getElementById('moodPercent').innerText = `${user.moodConsistencyPercent}%`;
  document.getElementById('moodFill').style.width = `${user.moodConsistencyPercent}%`;

  // Quick actions handler (cards)
  document.querySelectorAll('.qa-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      handleQuick(action);
    });
  });

  // settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    // replace with navigation logic
    alert('Open settings (replace with router/navigation)');
  });
});

// quick action central handler
function handleQuick(action) {
  switch(action) {
    case 'book':
      // open booking modal / route - replace with your app code
      alert('Open booking screen');
      break;
    case 'mood':
      // open mood entry
      const mood = prompt('How are you feeling today? (1-10)');
      if (mood) {
        alert(`Saved mood: ${mood}/10 (replace with real API call)`);
        // after saving, you would update DOM or reload data
      }
      break;
    case 'courses':
      alert('Go to courses');
      break;
    case 'assess':
      alert('Open assessments');
      break;
    default:
      console.log('unknown action', action);
  }
} 

document.querySelector('[data-section="sounds"]')?.addEventListener("click", () => {
  window.location.href = "sounds.html";
});

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function selectMenu(element) {
  document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");
  
  // Agar koi page kholna hai to
  const section = element.getAttribute("data-section");
  if(section === "sounds") window.location.href = "sounds.html";
  else if(section === "journal") window.location.href = "journal.html";
  else if(section === "crisis") window.location.href = "crisis.html";
  // ... baaki sab add kar dena
  
  // Mobile pe menu band ho jaye
  if(window.innerWidth <= 768) {
    setTimeout(() => toggleSidebar(), 300);
  }
}

// Click outside to close (optional)
document.addEventListener("click", function(e) {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.querySelector(".menu-toggle");
  if(sidebar.classList.contains("active") && 
     !sidebar.contains(e.target) && 
     !toggle.contains(e.target)) {
    toggleSidebar();
  }
});
function logout() {
  if (confirm("Are you sure you want to logout?\n\nAll your data will be cleared.")) {
    
    // Sab data delete
    localStorage.clear();
    sessionStorage.clear();
    
    // 4 tarike se index.html pe bhejne ki koshish karenge – ek toh chalega hi!
    try {
      window.location.href = "index.html";
    } catch(e) {
      try {
        window.location.replace("index.html");
      } catch(e) {
        try {
          window.location.assign("index.html");
        } catch(e) {
          window.location = "index.html";
        }
      }
    }
    
    // Force reload bhi kar do agar page same folder mein hai
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }
}