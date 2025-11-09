document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    alert("Login required");
    window.location.href = "/registration";
    return;
  }

  const entriesEl = document.getElementById("entries");
  const refreshMineBtn = document.getElementById("refreshMine");
  const refreshAllBtn = document.getElementById("refreshAll");

  // Show 'All' button for Admin or Therapist roles
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = (payload.role || "").toLowerCase();
    if (role === "admin" || role === "therapist") {
      refreshAllBtn.style.display = "inline-block";
    }
  } catch (e) {
    console.warn("Could not parse JWT payload", e);
  }

  const renderEntries = (list) => {
    entriesEl.innerHTML = "";
    if (!list || list.length === 0) {
      entriesEl.innerHTML = "<p>No entries yet.</p>";
      return;
    }
    list.forEach((row) => {
      const div = document.createElement("div");
      div.className = "entry";
      div.innerHTML = `
        <div><strong>${row.mood}</strong> <em>(score: ${row.mood_score ?? "-"})</em></div>
        <div>${row.note ? row.note : ""}</div>
        <div style="font-size:12px;color:#666">by ${row.user_email} at ${new Date(row.created_at).toLocaleString()}</div>
      `;
      entriesEl.appendChild(div);
    });
  };

  const loadMine = async () => {
    try {
      const res = await fetch("/api/mental/mood?mine=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      renderEntries(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load entries");
    }
  };

  const loadAll = async () => {
    try {
      const res = await fetch("/api/mental/mood?all=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) {
        alert("Forbidden: only admin or therapist can view all entries");
        return;
      }
      const data = await res.json();
      renderEntries(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load all entries");
    }
  };

  refreshMineBtn.addEventListener("click", loadMine);
  refreshAllBtn.addEventListener("click", loadAll);

  document.getElementById("moodForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const mood = document.getElementById("mood").value;
    const score = parseInt(document.getElementById("score").value, 10);
    const note = document.getElementById("note").value;
    if (!mood) {
      alert("Please select mood");
      return;
    }
    try {
      const res = await fetch("/api/mental/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood, mood_score: score, note }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error saving mood");
        return;
      }
      loadMine();
    } catch (e) {
      console.error(e);
      alert("Failed to save mood");
    }
  });

  // Initial load
  loadMine();
});