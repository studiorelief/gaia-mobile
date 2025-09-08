/*
 *============================================================================
 * COMPONENT : SECTION / METIERS
 *============================================================================
 */

import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function initReviewsSwiper() {
  const swipers = document.querySelectorAll('.swiper.is-reviews');

  if (swipers.length === 0) {
    return;
  }

  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      direction: 'horizontal',
      centeredSlides: false,
      speed: 1000,
      grabCursor: true,
      allowTouchMove: true,
      keyboard: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
        eventsTarget: 'container',
      },
      pagination: {
        el: '.swiper-pagination-invert-wrapper',
        bulletClass: 'swiper-bullet-invert',
        bulletActiveClass: 'swiper-bullet-invert-active',
        clickable: true,
      },
      navigation: {
        nextEl: '.reviews_right-button',
        prevEl: '.reviews_left-button',
      },
      touchEventsTarget: 'wrapper',
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16 * 1,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 16 * 1,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 16 * 1,
        },
      },
    });
  });
}
