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
});
