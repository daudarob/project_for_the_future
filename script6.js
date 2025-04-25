// Add this to the saveConnection function
function saveConnection(data) {
    const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || [];
    
    // Check for existing connection with same URL or username
    const exists = savedConnections.some(conn => 
      conn.url === data.url || 
      (conn.platform === data.platform && conn.username === data.username)
    );
    
    if (!exists) {
      savedConnections.push(data);
      localStorage.setItem('socialConnections', JSON.stringify(savedConnections));
    } else {
      alert('This profile is already connected.');
    }
  }