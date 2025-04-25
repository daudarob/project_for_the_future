// Monetization Features
document.addEventListener('DOMContentLoaded', function() {
    // Revenue Calculator
    const calculateRevenueBtn = document.getElementById('calculateRevenue');
    const revenueResult = document.getElementById('revenueResult');
    
    calculateRevenueBtn.addEventListener('click', function() {
        const views = parseInt(document.getElementById('monthlyViews').value);
        const engagement = parseInt(document.getElementById('engagementRate').value);
        
        if (isNaN(views)) {
            alert('Please enter a valid number for monthly views');
            return;
        }
        
        // Simple revenue calculation formula
        const revenue = (views * 0.001) * (1 + (engagement / 10));
        revenueResult.innerHTML = `
            <h4>Estimated Monthly Revenue:</h4>
            <div class="revenue-value">$${revenue.toFixed(2)}</div>
            <p>Based on ${views.toLocaleString()} views and ${engagement}% engagement rate</p>
        `;
    });

    // Simulate affiliate stats
    function updateAffiliateStats() {
        // In a real app, these would come from an API
        const clicks = Math.floor(Math.random() * 1000) + 50;
        const conversions = Math.floor(clicks * 0.1);
        const earnings = conversions * 2.5; // $2.50 per conversion
        
        document.getElementById('clicks').textContent = clicks.toLocaleString();
        document.getElementById('conversions').textContent = conversions.toLocaleString();
        document.getElementById('earnings').textContent = `$${earnings.toFixed(2)}`;
    }
    
    // Update stats every 5 seconds to simulate live data
    updateAffiliateStats();
    setInterval(updateAffiliateStats, 5000);
    
    // Affiliate portal button
    document.getElementById('viewAffiliatePortal').addEventListener('click', function() {
        alert('In a real implementation, this would open the affiliate portal');
    });

    // Membership selection
    document.querySelectorAll('.membership-button').forEach(button => {
        button.addEventListener('click', function() {
            const tier = this.dataset.tier;
            alert(`You've selected the ${tier} membership tier. In a real implementation, this would start the checkout process.`);
        });
    });

    // About Page Animations
    function animateStats() {
        const stats = [
            { element: 'usersCount', target: 12500, suffix: '+' },
            { element: 'platformsCount', target: 18, suffix: '+' },
            { element: 'earningsCount', target: 1.2, prefix: '$', suffix: 'M+' }
        ];
        
        stats.forEach(stat => {
            const element = document.getElementById(stat.element);
            let current = 0;
            const increment = stat.target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    clearInterval(timer);
                    current = stat.target;
                }
                
                if (stat.prefix) {
                    element.textContent = stat.prefix + current.toFixed(stat.suffix === 'M+' ? 1 : 0) + stat.suffix;
                } else {
                    element.textContent = current.toFixed(0) + stat.suffix;
                }
            }, 20);
        });
    }
    
    // Animate stats when About section is in view
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        // In a real implementation, send this data to your server
        console.log('Contact form submitted:', { name, email, message });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});