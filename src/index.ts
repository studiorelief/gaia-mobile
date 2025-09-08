import './index.css';

import { initCiblesSwiper } from './utils/component/ciblesSlider';
import { initCollaborateursSwiper } from './utils/component/logoMarkee';
import { initMetiersSwiper } from './utils/component/metiersSlider';
import { initReviewsSwiper } from './utils/component/reviewsSlider';
import { loadAttributesScripts } from './utils/global/loadScript';
import { initMarker } from './utils/global/marker';
import {
  navbarHoverOpen,
  navbarMobileOpen,
  navbarPositionManager,
  navbarScrollBehavior,
} from './utils/global/navbar';
import { hideDynListIfEmpty, toggleSelectCustomActive } from './utils/global/tricks';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* Script */
  loadAttributesScripts();

  /* Recettage */
  initMarker();

  /* tricks */
  hideDynListIfEmpty();
  toggleSelectCustomActive();

  /* Navbar */
  navbarHoverOpen();
  navbarMobileOpen();
  window.addEventListener('resize', navbarHoverOpen);
  navbarPositionManager();
  navbarScrollBehavior();

  /* Component */
  initCollaborateursSwiper();
  initMetiersSwiper();
  initCiblesSwiper();
  initReviewsSwiper();
});
