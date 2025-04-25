// Social Media URL Handler - Core Functionality
class SocialMediaLinker {
    constructor() {
      this.platforms = {
        'facebook': {
          pattern: /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb)\.com\/([a-zA-Z0-9\.\-]+)/,
          icon: 'fab fa-facebook',
          color: '#4267B2',
          name: 'Facebook'
        },
        'twitter': {
          pattern: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
          icon: 'fab fa-twitter',
          color: '#1DA1F2',
          name: 'Twitter'
        },
        'instagram': {
          pattern: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_\.]+)/,
          icon: 'fab fa-instagram',
          color: '#E1306C',
          name: 'Instagram'
        },
        'linkedin': {
          pattern: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(in|company|school)\/([a-zA-Z0-9\-]+)/,
          icon: 'fab fa-linkedin',
          color: '#0077B5',
          name: 'LinkedIn'
        },
        'youtube': {
          pattern: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(channel|user|c)\/([a-zA-Z0-9\-]+)/,
          icon: 'fab fa-youtube',
          color: '#FF0000',
          name: 'YouTube'
        },
        'tiktok': {
          pattern: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/(@[a-zA-Z0-9_\.]+)/,
          icon: 'fab fa-tiktok',
          color: '#000000',
          name: 'TikTok'
        },
        'pinterest': {
          pattern: /(?:https?:\/\/)?(?:www\.)?pinterest\.(com|fr|de|it|es|ru|co\.uk|jp)\/([a-zA-Z0-9_\-]+)/,
          icon: 'fab fa-pinterest',
          color: '#E60023',
          name: 'Pinterest'
        },
        'reddit': {
          pattern: /(?:https?:\/\/)?(?:www\.)?reddit\.com\/(user|r)\/([a-zA-Z0-9_\-]+)/,
          icon: 'fab fa-reddit',
          color: '#FF5700',
          name: 'Reddit'
        },
        'snapchat': {
          pattern: /(?:https?:\/\/)?(?:www\.)?snapchat\.com\/add\/([a-zA-Z0-9_\-\.]+)/,
          icon: 'fab fa-snapchat',
          color: '#FFFC00',
          name: 'Snapchat'
        },
        'twitch': {
          pattern: /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_\-]+)/,
          icon: 'fab fa-twitch',
          color: '#9146FF',
          name: 'Twitch'
        }
      };
    }
  
    // Extract platform and username from URL
    parseUrl(url) {
      for (const [platform, data] of Object.entries(this.platforms)) {
        const match = url.match(data.pattern);
        if (match) {
          return {
            platform,
            username: match[1] || match[2], // Handle different regex groups
            icon: data.icon,
            color: data.color,
            name: data.name,
            url: this.normalizeUrl(url, platform)
          };
        }
      }
      return null;
    }
  
    // Normalize URL to standard format
    normalizeUrl(url, platform) {
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      
      // Remove any URL parameters
      url = url.split('?')[0];
      
      // Special handling for certain platforms
      if (platform === 'instagram' && !url.includes('/p/')) {
        url = url.replace(/\/$/, ''); // Remove trailing slash
      }
      
      return url;
    }
  
    // Generate connection card HTML
    generateConnectionCard(data) {
      return `
        <div class="social-card">
          <div class="social-icon" style="color: ${data.color}">
            <i class="${data.icon}"></i>
          </div>
          <h3>${data.name}</h3>
          <p class="profile-url">${data.url}</p>
          <div class="connection-status">
            <span class="connected-badge"><i class="fas fa-check-circle"></i> Connected</span>
          </div>
          <div class="connection-actions">
            <button class="action-button view-button" data-url="${data.url}">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="action-button disconnect-button">
              <i class="fas fa-unlink"></i> Disconnect
            </button>
          </div>
        </div>
      `;
    }
  }