const date = '20230830';  // Assuming you want to get scores for August 30, 2023
const endpoint = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';

let currentScores = "";  // This will keep track of the scores currently displayed

function fetchScores() {
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Inspect the data structure

            const scores = data.events.map(event => {
                let teamA = event.competitions[0].competitors[0];
                let teamB = event.competitions[0].competitors[1];
                return `${teamA.team.abbreviation} ${teamA.score} - ${teamB.team.abbreviation} ${teamB.score}`;
            }).join(' | ');

            const repeatedScores = Array(10).fill(scores).join(' | ');

            // Only update the ticker if there's new data
            if (repeatedScores !== currentScores) {
                document.getElementById('scores').textContent = repeatedScores;
                currentScores = repeatedScores;
            }
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
            document.getElementById('scores').textContent = 'Failed to load scores.';
        });
}

// Fetch scores when the script loads
fetchScores();

// Update scores every 5 minutes (300,000 milliseconds)
setInterval(fetchScores, 300000);
