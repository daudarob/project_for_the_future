
  const fetchProfileData = async (url) => {
    const platformData = this.parseUrl(url);
    if (!platformData) return null;
  
    try {
      const response = await fetch(`/api/profile-info?url=${encodeURIComponent(url)}`);
  
      if (!response.ok) {
        console.warn(`API responded with status: ${response.status} for URL: ${url}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the expected properties exist in the data and are not null/undefined
      if (data && typeof data === 'object' &&
          data.followers !== undefined && data.followers !== null &&
          data.profile_pic !== undefined && data.profile_pic !== null &&
          data.verified !== undefined && data.verified !== null) {
  
        return {
          ...platformData,
          followers: data.followers,
          profilePic: data.profile_pic,
          verified: data.verified
        };
      } else {
        console.warn("API response missing expected properties or contains null/undefined values:", data);
        return platformData; // Return platformData if API response is incomplete
      }
  
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return platformData; // Return basic data if API fails
    }
  }
  
  