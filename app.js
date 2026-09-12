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
  const statusDiv = document.getElementById('status');
  const errorDiv = document.getElementById('error');
  const resultDiv = document.getElementById('result');

  statusDiv.textContent = 'Loading...';
  errorDiv.textContent = '';
  resultDiv.innerHTML = '';

  if (!navigator.onLine) {
    errorDiv.textContent = "You're offline. Check your connection and try again.";
    statusDiv.textContent = '';
    return;
  }

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      errorDiv.textContent = `No GitHub user found for "${username}".`;
      return;
    }

    if (!response.ok) {
      errorDiv.textContent = `GitHub returned an error (status ${response.status}). Try again.`;
      return;
    }

    const data = await response.json();
    renderUser(data);

  } catch (err) {
    errorDiv.textContent = "Couldn't reach GitHub. Check your connection and try again.";
  } finally {
    statusDiv.textContent = '';
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