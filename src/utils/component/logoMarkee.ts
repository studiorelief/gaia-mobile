/*
 *============================================================================
 * COMPONENT : SECTION / COLLABORATEURS
 *============================================================================
 */

import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function initCollaborateursSwiper() {
  const swipers = document.querySelectorAll('.swiper.is-collaborateurs');

  if (swipers.length === 0) {
    return;
  }

  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      direction: 'horizontal',
      loop: true,
      centeredSlides: false,
      speed: 5000,
      autoplay: {
        delay: 0,
        reverseDirection: false,
      },
      grabCursor: false,
      allowTouchMove: false,
      mousewheel: false,
      passiveListeners: true,
      breakpoints: {
        320: {
          slidesPerView: 4,
          spaceBetween: 16 * 2.5,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 16 * 2.5,
        },
        992: {
          slidesPerView: 7,
          spaceBetween: 16 * 5,
        },
      },
    });
  });
}
