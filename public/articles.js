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
