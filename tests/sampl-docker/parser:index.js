const axios = require('axios');
const fs = require('fs');
const config = require('../orchestration/config.json');

// Ensure output directory exists
const outputDir = config.github.output_dir;
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function fetchGitHubRepos(username) {
  try {
    const url = `https://api.github.com/users/${username}/repos`;
    const { data } = await axios.get(url);
    const repos = data.map(repo => ({
      name: repo.name,
      description: repo.description,
      link: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }));
    fs.writeFileSync(`${outputDir}/repos.json`, JSON.stringify(repos, null, 2));
    console.log(`Parsed data saved to ${outputDir}/repos.json`);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
  }
}

// Run
fetchGitHubRepos(config.github.username);
