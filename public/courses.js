const courseDays = {
    "Anxiety": 2,
    "Deep Sleep": 4,
    "Stress": 1,
    "Mindful Eating": 3,
    "Health & Wellness": 4,
    "Childhood Trauma": 1,
    "Self Reflection": 3,
    "Balance": 5,
    "Focus": 2,
    "Empathy 101": 2,
    "Motivation": 4,
    "Creativity": 1,
    "Self Esteem": 3,
    "Deep Sadness": 4,
    "Relationship": 2,
    "Happiness": 1,
    "Self Love": 1,
    "Self Acceptance": 4,
    "Quit Coffee": 5,
    "Black Heritage": 1,
    "LGBTQ+ ME": 1
    
};


// Open tab with course days
function openDays(courseName) {
    const days = courseDays[courseName];
    
    const newTab = window.open("", "_blank");

    let html = `
    <html>
    <head>
        <title>${courseName} - Days</title>
        <style>
        
        
            body { font-family: Arial; padding: 20px; background:#001f3f; }
            h2 { text-align:center; margin-bottom:20px;color:white; }
            .day-btn { display:block; width:80%; max-width:200px; margin:10px auto; padding:10px 0; font-size:16px; cursor:pointer; border-radius:5px; border:1px solid white; background:#014080;color:white; }

            .day-btn:hover {
  background: #01336688; /* slight lighter blue on hover */
  color: white;
  transform: translateY(-4px);
}
            .back-btn { margin-top:30px; padding:10px 20px; cursor:pointer;
             border-radius:5px; border:1px; 
             display:block; margin-left:auto; margin-right:auto;}
             .back-btn:hover {
  background: #01336688; /* slight lighter blue on hover */
  color: #01336688;
  transform: translateY(-4px);
}
        </style>
    </head>
    <body>
        <h2>${courseName} - Days</h2>
    `;

    for (let i = 1; i <= days; i++) {
        html += `
            <button class="day-btn" onclick="openDayTab('${courseName}', ${i})">Day ${i}</button>
        `;
    }

    // Back button to close this tab
    html += `
        <button class="back-btn" onclick="window.close()">Back</button>
    `;

    // Add script to open individual day tabs
    html += `
        <script>
            function openDayTab(courseName, dayNumber) {
                const dayTab = window.open("", "_blank");
                dayTab.document.write(\`
                    <html>
                    <head>
                        <title>\${courseName} - Day \${dayNumber}</title>
                        <style>
                            body { font-family: Arial; padding: 20px; background:#001f3f; text-align:center; }
                            h2 { margin-bottom:20px; color:white; }
                            .back-btn { margin-top:20px; padding:10px 20px; cursor:pointer; border-radius:5px; border:1px solid #0077cc; background:#fff; }
                            .back-btn:hover {
  background: #01336688; /* slight lighter blue on hover */
  color: white;
  transform: translateY(-4px);
}

                            audio { display:block; margin:20px auto; }
                        </style>
                    </head>
                    <body>
                        <h2>\${courseName} - Day \${dayNumber}</h2>
                        <audio controls autoplay src="audio/\${courseName.replace(/ /g,'_').toLowerCase()}/day\${dayNumber}.mp3"></audio>
                        <button class="back-btn" onclick="window.close()">Back</button>
                    </body>
                    </html>
                \`);
                dayTab.document.close();
            }
        <\/script>
    `;

    html += `</body></html>`;

    newTab.document.write(html);
    newTab.document.close();
}
