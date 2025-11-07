// Hamburger Menu Functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenu = document.querySelector('.close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

// Toggle mobile menu
hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking close button
closeMenu.addEventListener('click', function() {
    hamburgerMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking on navigation links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside the menu content
mobileMenuOverlay.addEventListener('click', function(e) {
    if (e.target === mobileMenuOverlay) {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project cards scroll animation
const cards = document.querySelectorAll('.project-card');
const revealOnScroll = () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // trigger on load

// Video hover functionality
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const hoverSigns = document.querySelectorAll('.hover-sign');

const videoList = [video1, video2, video3];

// Initialize videos - set to autoplay on page load and loop
videoList.forEach(function(video) {
  if (video) {
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    // Play video immediately and ensure it stays playing
    video.play().catch(e => {
      console.log('Video autoplay failed:', e);
    });
  }
});

// Add hover play/pause functionality
videoList.forEach(function(video, index) {
  if (video) {
    video.addEventListener("mouseover", function() {
      video.play().catch(e => console.log('Play failed:', e));
      // Hide hover sign for this specific video
      if (hoverSigns[index]) {
        hoverSigns[index].classList.add("active");
      }
    });
    
    video.addEventListener("mouseout", function() {
      // Don't pause on mouseout - keep playing
      // video.pause();
      if (hoverSigns[index]) {
        hoverSigns[index].classList.remove("active");
      }
    });

    // Ensure video plays when it comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(e => console.log('Intersection play failed:', e));
        }
      });
    }, { threshold: 0.5 });

    observer.observe(video);
  }
});

// Add click to play/pause functionality
videoList.forEach(function(video) {
  if (video) {
    video.addEventListener("click", function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});

// Perfect Seamless Slider 
function createPerfectSeamlessSlider() {
    const slider = document.querySelector('.slider');
    const list = document.querySelector('.slider .list');
    const items = document.querySelectorAll('.slider .list .item');
    
    const itemWidth = 100; // Match --width
    const gap = 15;
    const originalItemsCount = 13;
    
    let currentPosition = 0;
    const speed = 2; // Pixels per frame - adjust for speed (1-3 works well)
    const oneSetWidth = (itemWidth + gap) * originalItemsCount;
    
    let animationId;
    let isPaused = false;

    function animateSlider() {
        if (!isPaused) {
            currentPosition -= speed;
            
            // Reset to start when we've scrolled one complete set
            if (Math.abs(currentPosition) >= oneSetWidth) {
                currentPosition = 0;
            }
            
            list.style.transform = `translateX(${currentPosition}px)`;
        }
        
        animationId = requestAnimationFrame(animateSlider);
    }
    
    // Start the animation
    animateSlider();
    
    // Updated hover functionality 
    const sliderItems = document.querySelectorAll('.slider .list .item');
    
    sliderItems.forEach(item => {
        const img = item.querySelector('img');
        
        img.addEventListener('mouseenter', function() {
            isPaused = true;
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'brightness(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            isPaused = false;
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Pause when hovering over the entire slider (optional)
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    slider.addEventListener('mouseleave', () => {
        isPaused = false;
    });
}

// Initialize the seamless slider
createPerfectSeamlessSlider();



// Skills Slider - Pause on individual image hover
const sliderList = document.querySelector('.slider .list');
const sliderItems = document.querySelectorAll('.slider .list .item');

sliderItems.forEach(item => {
    const img = item.querySelector('img');
    
    // Pause when hovering over individual image
    img.addEventListener('mouseenter', function() {
        sliderList.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.2)';
        this.style.filter = 'brightness(1.2)';
    });
    
    // Resume when mouse leaves individual image
    img.addEventListener('mouseleave', function() {
        sliderList.style.animationPlayState = 'running';
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
    });
});