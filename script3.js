document.addEventListener('DOMContentLoaded', function() {
    const socialLinker = new SocialMediaLinker();
    const addButton = document.getElementById('addSocialButton');
    const urlInput = document.getElementById('socialMediaUrl');
    const connectionsContainer = document.getElementById('customConnectionsContainer');
  
    // Add connection button handler
    addButton.addEventListener('click', function() {
      const url = urlInput.value.trim();
      if (!url) return;
      
      const connectionData = socialLinker.parseUrl(url);
      if (connectionData) {
        const cardHtml = socialLinker.generateConnectionCard(connectionData);
        connectionsContainer.insertAdjacentHTML('beforeend', cardHtml);
        urlInput.value = '';
        
        // Save to localStorage
        saveConnection(connectionData);
      } else {
        alert('Unsupported platform or invalid URL. Please check the URL and try again.');
      }
    });
  
    // Load saved connections on page load
    loadSavedConnections();
  
    // Handle click events on dynamically added buttons
    connectionsContainer.addEventListener('click', function(e) {
      if (e.target.closest('.view-button')) {
        const url = e.target.closest('.view-button').dataset.url;
        window.open(url, '_blank');
      }
      
      if (e.target.closest('.disconnect-button')) {
        const card = e.target.closest('.social-card');
        const profileUrl = card.querySelector('.profile-url').textContent;
        card.remove();
        removeConnection(profileUrl);
      }
    });
  
    // Load saved connections from localStorage
    function loadSavedConnections() {
      const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || [];
      savedConnections.forEach(conn => {
        const cardHtml = socialLinker.generateConnectionCard(conn);
        connectionsContainer.insertAdjacentHTML('beforeend', cardHtml);
      });
    }
  
    // Save connection to localStorage
    function saveConnection(data) {
      const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || [];
      if (!savedConnections.some(conn => conn.url === data.url)) {
        savedConnections.push(data);
        localStorage.setItem('socialConnections', JSON.stringify(savedConnections));
      }
    }
  
    // Remove connection from localStorage
    function removeConnection(url) {
      let savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || [];
      savedConnections = savedConnections.filter(conn => conn.url !== url);
      localStorage.setItem('socialConnections', JSON.stringify(savedConnections));
    }
  });