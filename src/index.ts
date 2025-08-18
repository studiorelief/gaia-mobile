import './index.css';

import { initCollaborateursSwiper } from './utils/component/logoMarkee';
import { initMetiersSwiper } from './utils/component/metiersSlider';
import loadScript from './utils/global/loadScript';
import { initMarker } from './utils/global/marker';
import {
  navbarHoverOpen,
  navbarMobileOpen,
  navbarPositionManager,
  navbarScrollBehavior,
} from './utils/global/navbar';
import { hideDynListIfEmpty } from './utils/global/tricks';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* Script */
  loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js');

  /* Recettage */
  initMarker();

  /* global */
  hideDynListIfEmpty();

  /* Navbar */
  navbarHoverOpen();
  navbarMobileOpen();
  window.addEventListener('resize', navbarHoverOpen);
  navbarPositionManager();
  navbarScrollBehavior();

  /* Component */
  initCollaborateursSwiper();
  initMetiersSwiper();
});
