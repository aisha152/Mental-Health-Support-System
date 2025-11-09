document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    alert("Login required");
    window.location.href = "/registration";
    return;
  }

  const form = document.getElementById("assessmentForm");
  const latestEl = document.getElementById("latest");

  async function loadLatest() {
    try {
      const res = await fetch("/api/mental/assessments/latest?mine=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const rows = await res.json();
      if (!rows || rows.length === 0) {
        latestEl.textContent = "No assessment yet.";
        return;
      }
      const r = rows[0];
      latestEl.innerHTML = `Score: <strong>${r.score}</strong> (${r.severity}) at ${new Date(r.created_at).toLocaleString()}`;
    } catch (e) {
      console.error(e);
      latestEl.textContent = "Error loading latest assessment";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const selects = form.querySelectorAll("select[data-q]");
    const answers = Array.from(selects).map((s) => parseInt(s.value, 10));
    try {
      const res = await fetch("/api/mental/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers, assessment_type: "PHQ-9" }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error submitting assessment");
        return;
      }
      alert(`Submitted. Score: ${data.score}, Severity: ${data.severity}`);
      loadLatest();
    } catch (e) {
      console.error(e);
      alert("Failed to submit assessment");
    }
  });

  // Initial load
  loadLatest();
});