document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. MODAL FUNCTIONALITY
    // ======================
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const modals = {
        signIn: createModal('Sign In', 'signInModal'),
        signUp: createModal('Sign Up', 'signUpModal')
    };

    function createModal(title, id) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = id;
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>${title}</h2>
                <form id="${id}Form">
                    <div class="form-group">
                        <label for="${id}Email">Email</label>
                        <input type="email" id="${id}Email" required>
                    </div>
                    <div class="form-group">
                        <label for="${id}Password">Password</label>
                        <input type="password" id="${id}Password" required>
                    </div>
                    ${id === 'signUpModal' ? `
                    <div class="form-group">
                        <label for="signUpConfirmPassword">Confirm Password</label>
                        <input type="password" id="signUpConfirmPassword" required>
                    </div>` : ''}
                    <button type="submit" class="modal-button">${title}</button>
                </form>
                <div class="form-footer">
                    ${id === 'signInModal' ? 
                    'Don\'t have an account? <a href="#" id="showSignUp">Sign Up</a>' : 
                    'Already have an account? <a href="#" id="showSignIn">Sign In</a>'}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Modal event handlers
    signInBtn.addEventListener('click', () => modals.signIn.style.display = 'block');
    signUpBtn.addEventListener('click', () => modals.signUp.style.display = 'block');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
            e.target.closest('.modal').style.display = 'none';
        }
        if (e.target.id === 'showSignUp') {
            modals.signIn.style.display = 'none';
            modals.signUp.style.display = 'block';
        }
        if (e.target.id === 'showSignIn') {
            modals.signUp.style.display = 'none';
            modals.signIn.style.display = 'block';
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Form submissions
    document.getElementById('signInModalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add actual authentication logic here
        alert('Sign In functionality would be implemented here');
        this.reset();
        modals.signIn.style.display = 'none';
    });

    document.getElementById('signUpModalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Add actual registration logic here
        alert('Sign Up functionality would be implemented here');
        this.reset();
        modals.signUp.style.display = 'none';
    });

    // ======================
    // 2. SOCIAL MEDIA CONNECTIONS
    // ======================
    class SocialMediaLinker {
        constructor() {
            this.platforms = {
                'facebook': { icon: 'fab fa-facebook', color: '#4267B2' },
                'twitter': { icon: 'fab fa-twitter', color: '#1DA1F2' },
                'instagram': { icon: 'fab fa-instagram', color: '#E1306C' },
                'linkedin': { icon: 'fab fa-linkedin', color: '#0077B5' },
                'youtube': { icon: 'fab fa-youtube', color: '#FF0000' },
                'tiktok': { icon: 'fab fa-tiktok', color: '#000000' },
                'pinterest': { icon: 'fab fa-pinterest', color: '#E60023' },
                'reddit': { icon: 'fab fa-reddit', color: '#FF5700' }
            };
        }

        generateConnectionCard(platform) {
            const platformData = this.platforms[platform];
            return `
                <div class="social-card">
                    <div class="social-icon" style="color: ${platformData.color}">
                        <i class="${platformData.icon}"></i>
                    </div>
                    <h3>${platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
                    <p>Connect your ${platform} account to access advanced features</p>
                    <button class="connect-button" data-platform="${platform}">
                        <i class="fas fa-link"></i> Connect
                    </button>
                </div>
            `;
        }
    }

    const socialLinker = new SocialMediaLinker();
    const socialGrid = document.querySelector('.grid-container');

    // Initialize platform connection cards
    Object.keys(socialLinker.platforms).forEach(platform => {
        socialGrid.insertAdjacentHTML('beforeend', socialLinker.generateConnectionCard(platform));
    });

    // Connection button handlers
    socialGrid.addEventListener('click', function(e) {
        if (e.target.closest('.connect-button')) {
            const platform = e.target.closest('.connect-button').dataset.platform;
            initiateConnection(platform);
        }
    });

    function initiateConnection(platform) {
        // In a real implementation, this would use OAuth or platform-specific APIs
        alert(`In a real implementation, this would connect to ${platform} using their API`);
        
        // Simulate successful connection
        const button = document.querySelector(`.connect-button[data-platform="${platform}"]`);
        button.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
        button.style.backgroundColor = 'var(--success-color)';
    }

    // ======================
    // 3. DARK MODE TOGGLE
    // ======================
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <button class="toggle-button" id="darkModeToggle">
            <i class="fas fa-moon"></i>
        </button>
    `;
    document.body.appendChild(darkModeToggle);

    const darkModeToggleBtn = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved preference or system preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (localStorage.getItem('darkMode') !== 'disabled' && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        darkModeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // ======================
    // 4. LIVE FEED INTERACTIONS
    // ======================
    const feedContent = document.querySelector('.feed-content');
    
    // Simulate live feed updates
    setInterval(() => {
        const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
        const actions = ['liked', 'commented on', 'shared', 'mentioned you in'];
        const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomNumber = Math.floor(Math.random() * 10000);
        
        const newPost = document.createElement('div');
        newPost.className = 'feed-item';
        newPost.innerHTML = `
            <div class="feed-source">
                <div class="feed-source-icon" style="background-color: ${
                    randomPlatform === 'Facebook' ? '#4267B2' :
                    randomPlatform === 'Twitter' ? '#1DA1F2' :
                    randomPlatform === 'Instagram' ? '#E1306C' : '#0077B5'
                }">
                    <i class="fab fa-${randomPlatform.toLowerCase()}"></i>
                </div>
                <div class="feed-source-name">${randomPlatform}</div>
            </div>
            <div class="feed-text">
                Someone ${randomAction} your post! Engagement increased by ${randomNumber}.
            </div>
            <div class="feed-actions">
                <div class="feed-action"><i class="far fa-thumbs-up"></i> Like</div>
                <div class="feed-action"><i class="far fa-comment"></i> Comment</div>
                <div class="feed-action"><i class="fas fa-share"></i> Share</div>
            </div>
        `;
        
        feedContent.insertBefore(newPost, feedContent.firstChild);
        
        // Limit to 10 feed items
        if (feedContent.children.length > 10) {
            feedContent.removeChild(feedContent.lastChild);
        }
    }, 5000);

    // Feed action handlers
    feedContent.addEventListener('click', function(e) {
        if (e.target.closest('.feed-action')) {
            const action = e.target.closest('.feed-action').textContent.trim();
            alert(`Action "${action}" would be performed here`);
        }
    });

    // ======================
    // 5. POLL FUNCTIONALITY
    // ======================
    const pollOptions = document.querySelectorAll('.poll-option');
    const pollSubmit = document.querySelector('.poll-submit');
    let selectedOption = null;

    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            pollOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedOption = this;
        });
    });

    pollSubmit.addEventListener('click', function() {
        if (!selectedOption) {
            alert('Please select an option first');
            return;
        }
        
        // Simulate voting
        const totalVotes = 100 + Math.floor(Math.random() * 400);
        const optionVotes = Math.floor(totalVotes * (0.3 + Math.random() * 0.5));
        
        pollOptions.forEach(option => {
            const percentage = option === selectedOption ? 
                Math.round((optionVotes / totalVotes) * 100) :
                Math.round(((totalVotes - optionVotes) / (pollOptions.length - 1) / totalVotes) * 100);
            
            option.querySelector('.poll-percentage-fill').style.width = `${percentage}%`;
            option.querySelector('.poll-vote-count').textContent = `${percentage}% (${option === selectedOption ? optionVotes : Math.round((totalVotes - optionVotes) / (pollOptions.length - 1))} votes)`;
        });
        
        this.disabled = true;
        pollOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
    });

    // ======================
    // 6. GAMIFICATION & LEADERBOARD
    // ======================
    // Simulate user badges
    const badges = [
        { name: 'Social Butterfly', description: 'Connected 3+ platforms', icon: 'fas fa-butterfly' },
        { name: 'Engagement Pro', description: '100+ interactions', icon: 'fas fa-bolt' },
        { name: 'Content Creator', description: 'Posted 50+ times', icon: 'fas fa-pen-fancy' }
    ];

    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'badges-container';
    document.querySelector('.engagement-metrics .container').appendChild(badgesContainer);

    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        badgeElement.innerHTML = `
            <div class="badge-icon">
                <i class="${badge.icon}"></i>
            </div>
            <div class="badge-info">
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
            </div>
        `;
        badgesContainer.appendChild(badgeElement);
    });

    // Simulate leaderboard
    const leaderboardUsers = [
        { name: 'Alex Johnson', score: 1245, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Sarah Williams', score: 987, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Michael Brown', score: 756, avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
        { name: 'Emily Davis', score: 654, avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
        { name: 'David Miller', score: 543, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }
    ];

    const leaderboardList = document.querySelector('.leaderboard-list');
    leaderboardUsers.forEach((user, index) => {
        const userElement = document.createElement('li');
        userElement.className = 'leaderboard-item';
        userElement.innerHTML = `
            <div class="leaderboard-rank">${index + 1}</div>
            <div class="leaderboard-user">
                <div class="leaderboard-avatar">
                    <img src="${user.avatar}" alt="${user.name}">
                </div>
                <div class="leaderboard-name">${user.name}</div>
            </div>
            <div class="leaderboard-score">${user.score}</div>
        `;
        leaderboardList.appendChild(userElement);
    });

    // ======================
    // 7. MONETIZATION FEATURES
    // ======================
    // Track user engagement for monetization
    let engagementTime = 0;
    let interactions = 0;
    
    // Track time spent on page
    const engagementInterval = setInterval(() => {
        engagementTime++;
        // In a real implementation, send this to your backend
        console.log(`User engagement: ${engagementTime} seconds`);
        
        // Simulate earnings based on engagement
        if (engagementTime % 10 === 0) {
            const earnings = (engagementTime / 10) * 0.01; // $0.01 per 10 seconds
            console.log(`Estimated earnings: $${earnings.toFixed(2)}`);
        }
    }, 1000);
    
    // Track interactions
    document.addEventListener('click', () => {
        interactions++;
        // In a real implementation, send this to your backend
        console.log(`User interactions: ${interactions}`);
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(engagementInterval);
        // Send final engagement data to server
        console.log(`Final engagement: ${engagementTime} seconds, ${interactions} interactions`);
    });

    // ======================
    // 8. RESPONSIVE NAVIGATION
    // ======================
    const headerContainer = document.querySelector('.header-container');
    const nav = document.querySelector('nav ul');
    const authButtons = document.querySelector('.auth-buttons');
    
    function handleResponsiveNav() {
        if (window.innerWidth <= 768) {
            if (!headerContainer.classList.contains('responsive')) {
                headerContainer.classList.add('responsive');
                nav.style.display = 'none';
                authButtons.style.display = 'none';
                
                const menuButton = document.createElement('button');
                menuButton.className = 'menu-button';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                menuButton.addEventListener('click', function() {
                    const isVisible = nav.style.display === 'flex';
                    nav.style.display = isVisible ? 'none' : 'flex';
                    authButtons.style.display = isVisible ? 'none' : 'flex';
                });
                
                headerContainer.appendChild(menuButton);
            }
        } else {
            headerContainer.classList.remove('responsive');
            nav.style.display = 'flex';
            authButtons.style.display = 'flex';
            const menuButton = document.querySelector('.menu-button');
            if (menuButton) menuButton.remove();
        }
    }
    
    window.addEventListener('resize', handleResponsiveNav);
    handleResponsiveNav();
});