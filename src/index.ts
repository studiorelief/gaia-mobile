import './index.css';

import { initBlogSwiper } from './utils/component/blogBigSlider';
import { initBlogRecosSwiper } from './utils/component/blogRecosSlider';
import { initCiblesSwiper } from './utils/component/ciblesSlider';
import { initCollaborateursSwiper } from './utils/component/logoMarkee';
import { initMetiersSwiper } from './utils/component/metiersSlider';
import { initReviewsSwiper } from './utils/component/reviewsSlider';
import { initAutoTabs } from './utils/component/tabLoop';
import { loadAttributesScripts } from './utils/global/loadScript';
import { initMarker } from './utils/global/marker';
import {
  navbarDropdownState,
  navbarHoverOpen,
  navbarMobileOpen,
  navbarPositionManager,
  navbarScrollBehavior,
} from './utils/global/navbar';
import {
  copyUrl,
  hideDynListIfEmpty,
  mapMonths,
  toggleSelectCustomActive,
} from './utils/global/tricks';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* Script */
  loadAttributesScripts();

  /* tricks */
  hideDynListIfEmpty();
  toggleSelectCustomActive();
  mapMonths();
  copyUrl();

  /* Navbar */
  navbarHoverOpen();
  navbarMobileOpen();
  window.addEventListener('resize', navbarHoverOpen);
  navbarPositionManager();
  navbarScrollBehavior();
  navbarDropdownState();

  /* Component */
  initCollaborateursSwiper();
  initMetiersSwiper();
  initCiblesSwiper();
  initReviewsSwiper();
  initBlogSwiper();
  initBlogRecosSwiper();
  if (window.innerWidth > 991) {
    initAutoTabs();
  }

  /* Recettage */
  initMarker();
});
