const form = document.getElementById('search-form');
const usernameInput = document.getElementById('username-input');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    if (!username) {
        console.log('Please enter a username.');
        return;
    }
    
    fetchGitHubUser(username);
});

async function fetchGitHubUser(username) {
  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderUser(data);
  } catch (err) {
    console.log('Something went wrong:', err);
  }
}

function renderUser(data) {
  const resultDiv = document.getElementById('result');

  resultDiv.innerHTML = `
    <img src="${data.avatar_url}" alt="${data.login}" width="100">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || 'No bio available.'}</p>
    <p>Public repos: ${data.public_repos}</p>
    <p>Followers: ${data.followers}</p>
  `;
}