const therapists = [
  { name: "Dr. Imran Saeed", bio: "Cognitive behavioral therapist with expertise in couples therapy.", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Dr. Ayesha Khan", bio: "Specialist in anxiety, depression & mindfulness therapy.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Ahmed Raza", bio: "Trauma-informed therapist & life coach.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Sarah Ahmed", bio: "Child psychologist & family counselor.", img: "https://randomuser.me/api/portraits/women/44.jpg" }
];

const list = document.getElementById("therapistList");

therapists.forEach(t => {
  const card = document.createElement("div");
  card.className = "therapist-card";
  card.innerHTML = `
    <img src="${t.img}" alt="${t.name}">
    <h3>${t.name}</h3>
    <p class="bio">${t.bio}</p>
    <div class="time-slots">
      <div class="slot-card">9:30 AM</div>
      <div class="slot-card">11:30 AM</div>
      <div class="slot-card">2:30 PM</div>
      <div class="slot-card">4:00 PM</div>
      <div class="slot-card booked">7:00 PM</div>
    </div>
  `;
  list.appendChild(card);
});