function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        const name = member.querySelector('h3').textContent.toLowerCase();
        const role = member.querySelector('p').textContent.toLowerCase();
        if (name.includes(searchTerm) || role.includes(searchTerm)) {
            member.style.display = '';
        } else {
            member.style.display = 'none';
        }
    });
}

function setLoadingState(isLoading) {
    const searchButton = document.getElementById('search-button');
    if (isLoading) {
        searchButton.textContent = 'Buscando...';
        searchButton.classList.add('loading');
        searchButton.disabled = true;
    } else {
        searchButton.textContent = '🔍';
        searchButton.classList.remove('loading');
        searchButton.disabled = false;
    }
}

document.getElementById('search-button').addEventListener('click', function() {
    setLoadingState(true);
    setTimeout(() => {
        performSearch();
        setLoadingState(false);
    }, 1000);
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').focus();
    performSearch();
});