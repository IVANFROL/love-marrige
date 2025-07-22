document.addEventListener("DOMContentLoaded", () => {
  // Flipbook logic
  const flipbook = document.getElementById('flipbook');
  if (flipbook) {
    const pages = Array.from(flipbook.querySelectorAll('.flipbook-page'));
    let currentPage = 0;

    function showPage(index) {
      pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
      });
    }

    showPage(currentPage);

    const prevBtn = document.querySelector('.flipbook-btn.prev');
    const nextBtn = document.querySelector('.flipbook-btn.next');

    prevBtn.addEventListener('click', () => {
      currentPage = (currentPage - 1 + pages.length) % pages.length;
      showPage(currentPage);
    });
    nextBtn.addEventListener('click', () => {
      currentPage = (currentPage + 1) % pages.length;
      showPage(currentPage);
    });
  }

  // Wish photo auto-change logic
  const wishPhotoImages = [
    'assets/images/photos/2025-07-21 17.36.08.jpg',
    'assets/images/photos/2025-07-21 17.36.22.jpg',
    'assets/images/photos/2025-07-21 17.36.27.jpg',
    'assets/images/photos/2025-07-21 17.36.33.jpg',
    'assets/images/photos/2025-07-21 17.36.38.jpg',
    'assets/images/photos/2025-07-21 17.36.43.jpg',
  ];
  const wishPhoto = document.querySelector('.wish-photo');
  let wishPhotoIndex = 0;
  let wishPhotoTimer = null;

  function changeWishPhoto() {
    wishPhotoIndex = (wishPhotoIndex + 1) % wishPhotoImages.length;
    wishPhoto.src = wishPhotoImages[wishPhotoIndex];
    wishPhoto.alt = `Фото ${wishPhotoIndex + 1}`;
  }

  if (wishPhoto) {
    wishPhotoTimer = setInterval(changeWishPhoto, 3500);
  }

  // Wish page background auto-change logic
  const wishPageImages = [
    'assets/images/photos/2025-07-21 17.36.08.jpg',
    'assets/images/photos/2025-07-21 17.36.33.jpg',
    'assets/images/photos/2025-07-21 17.36.43.jpg',
  ];
  const wishesPage = document.querySelector('.wishes-page');
  let wishPageIndex = 0;
  let wishPageTimer = null;

  function changeWishPageBackground() {
    wishPageIndex = (wishPageIndex + 1) % wishPageImages.length;
    wishesPage.style.backgroundImage = `url('${wishPageImages[wishPageIndex]}')`;
  }

  if (wishesPage) {
    wishPageTimer = setInterval(changeWishPageBackground, 3500);
  }

  // Music control logic
  const backgroundMusic = document.getElementById('background-music');
  const musicToggle = document.getElementById('music-toggle');
  let musicStarted = false;

  // Debug audio loading
  console.log('Audio element found:', !!backgroundMusic);
  
  backgroundMusic.addEventListener('loadstart', () => {
    console.log('Audio load started');
  });
  
  backgroundMusic.addEventListener('canplay', () => {
    console.log('Audio can play');
  });
  
  backgroundMusic.addEventListener('error', (e) => {
    console.log('Audio error:', e);
  });

  // Start music on first user interaction
  function startMusic() {
    if (!musicStarted) {
      console.log('Starting music...');
      
      // For Safari/iOS, we need to start playing first, then set time
      backgroundMusic.play().then(() => {
        // Set time to 36 seconds after successful play
        backgroundMusic.currentTime = 36;
        musicStarted = true;
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        console.log('Music started successfully at 36 seconds');
      }).catch(err => {
        console.log('Music start failed:', err);
        // Try again with user gesture
        musicToggle.addEventListener('click', () => {
          if (!musicStarted) {
            backgroundMusic.play().then(() => {
              backgroundMusic.currentTime = 36;
              musicStarted = true;
              musicToggle.classList.add('playing');
              musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
              console.log('Music started on button click at 36 seconds');
            }).catch(err2 => {
              console.log('Music start failed on button click:', err2);
            });
          }
        }, { once: true });
      });
    }
  }

  // Listen for first user interaction - more events for mobile
  document.addEventListener('click', startMusic, { once: true });
  document.addEventListener('touchstart', startMusic, { once: true });
  document.addEventListener('touchend', startMusic, { once: true });
  document.addEventListener('touchmove', startMusic, { once: true });

  // Start music when user first interacts with flipbook
  if (prevBtn) {
    prevBtn.addEventListener('click', startMusic, { once: true });
    prevBtn.addEventListener('touchstart', startMusic, { once: true });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', startMusic, { once: true });
    nextBtn.addEventListener('touchstart', startMusic, { once: true });
  }

  musicToggle.addEventListener('click', () => {
    if (!musicStarted) {
      startMusic();
    } else {
      // Toggle play/pause
      if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
          // Ensure we're at 36 seconds when resuming
          if (backgroundMusic.currentTime < 36) {
            backgroundMusic.currentTime = 36;
          }
          musicToggle.classList.add('playing');
          musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        });
      } else {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
      }
    }
  });

  // Loop music when it ends
  backgroundMusic.addEventListener('ended', () => {
    backgroundMusic.currentTime = 36;
    backgroundMusic.play().catch(err => {
      console.log('Loop failed:', err);
    });
  });
});
