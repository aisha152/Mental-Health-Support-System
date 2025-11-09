// Bar Chart — Mood Entries per Week
const barChart = new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Mood Entries",
        data: [24, 31, 18, 36, 42, 33],
        backgroundColor: "rgba(76, 110, 245, 0.6)",
        borderColor: "rgba(76, 110, 245, 0.9)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeOutBounce", // Animation type
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to white
        },
      },
    },
  },
});

// Doughnut Chart — Assessment Severity Distribution
const doughnutChart = new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: {
    labels: ["Minimal", "Mild", "Moderate", "Mod. Severe", "Severe"],
    datasets: [
      {
        data: [40, 28, 18, 10, 4],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Blue
          "rgba(75, 192, 192, 0.7)", // Teal
          "rgba(255, 206, 86, 0.7)", // Yellow
          "rgba(255, 159, 64, 0.7)", // Orange
          "rgba(255, 99, 132, 0.7)", // Red
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeOutElastic", // Animation type
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to black
        },
      },
    },
  },
});

// Line Chart — Monthly New Users
const lineChart = new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [32, 45, 51, 60, 75, 84],
        borderColor: "rgba(76, 110, 245, 0.9)",
        fill: false,
        tension: 0.25,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeInOutCubic", // Animation type
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to white
        },
      },
    },
  },
});

// Polar Area Chart — Mood Category Breakdown
const polarChart = new Chart(document.getElementById("polarAreaChart"), {
  type: "polarArea",
  data: {
    labels: ["Happy", "Calm", "Stressed", "Sad", "Angry"],
    datasets: [
      {
        label: "Mood Share (%)",
        data: [35, 22, 18, 15, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeInOutBack", // Animation type
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to black
        },
      },
    },
  },
});

// Radar Chart — Engagement Across Features
const radarChart = new Chart(document.getElementById("radarChart"), {
  type: "radar",
  data: {
    labels: ["Mood", "Assessments", "Chatbot", "Resources", "Contact", "Profile"],
    datasets: [
      {
        label: "Engagement Score",
        data: [85, 72, 64, 58, 40, 66],
        backgroundColor: "rgba(76, 110, 245, 0.15)",
        borderColor: "rgba(76, 110, 245, 0.9)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeInOutCirc", // Animation type
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to white
        },
      },
    },
  },
});

// Scatter Chart — Mood Score vs. Entry Count (sample)
const scatterChart = new Chart(document.getElementById("scatterChart"), {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Mood Score vs Entries",
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 10 },
          { x: 5, y: 14 },
          { x: 6, y: 18 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: "easeOutQuad", // Animation type
    },
    scales: {
      x: {
        min: 0,
        max: 10,
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
      y: {
        min: 0,
        max: 20,
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Darker grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend text to white
        },
      },
    },
  },
});
