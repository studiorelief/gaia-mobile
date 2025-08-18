/*
 *============================================================================
 * COMPONENT : SECTION / METIERS
 *============================================================================
 */

import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function initMetiersSwiper() {
  const swipers = document.querySelectorAll('.swiper.is-metiers');

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
      //   mousewheel: {
      //     forceToAxis: true,
      //     sensitivity: 1,
      //     releaseOnEdges: true,
      //     eventsTarget: 'container',
      //   },
      pagination: {
        el: '.swiper-pagination-wrapper',
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'swiper-bullet-active',
        clickable: true,
      },
      touchEventsTarget: 'wrapper',
      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 16 * 1.5,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16 * 1.5,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 16 * 2,
        },
      },
    });
  });
}
