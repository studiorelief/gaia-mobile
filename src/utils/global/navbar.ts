/*
 *========================================================================================
 * COMPONENT :
 * Global / Navbar / Wrapper
 * Global / Navbar / Main
 * Global / Navbar / Top
 *========================================================================================
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const DESKTOP_BREAKPOINT = 991;
const SCROLL_THRESHOLD = 10;
const SCROLL_HIDE_OFFSET = 100;
const NAVBAR_SHOW_DELAY = 3000;
const RESIZE_DEBOUNCE = 100;

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

interface NavbarState {
  dropdownListeners: Map<
    Element,
    {
      mouseenter: () => void;
      mouseleave: () => void;
      dropdownMouseleave?: () => void;
    }
  >;
  resizeListener: (() => void) | null;
  scrollListener: (() => void) | null;
  lastScrollY: number;
  ticking: boolean;
  scrollTimeout: number | null;
}

const navbarState: NavbarState = {
  dropdownListeners: new Map(),
  resizeListener: null,
  scrollListener: null,
  lastScrollY: 0,
  ticking: false,
  scrollTimeout: null,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/*
 ! Clean up all dropdown event listeners and close open dropdowns
*/
function cleanupDropdownListeners(): void {
  // Remove all event listeners
  for (const [toggle, handlers] of navbarState.dropdownListeners) {
    toggle.removeEventListener('mouseenter', handlers.mouseenter);
    toggle.removeEventListener('mouseleave', handlers.mouseleave);

    // Remove dropdown body listener if it exists
    if (handlers.dropdownMouseleave) {
      const dropdownBody = toggle.nextElementSibling as HTMLElement;
      if (dropdownBody?.classList.contains('nav_menu_dropdown-body')) {
        dropdownBody.removeEventListener('mouseleave', handlers.dropdownMouseleave);
      }
    }
  }
  navbarState.dropdownListeners.clear();

  // Close all open dropdowns
  const openDropdowns = document.querySelectorAll('.nav_menu_dropdown-body.w--open');
  openDropdowns.forEach((dropdown) => {
    dropdown.classList.remove('w--open');
  });
}

/*
 ! Check if current viewport is desktop size
*/
function isDesktop(): boolean {
  return window.innerWidth > DESKTOP_BREAKPOINT;
}

/*
 ! Clear existing scroll timeout
*/
function clearScrollTimeout(): void {
  if (navbarState.scrollTimeout) {
    clearTimeout(navbarState.scrollTimeout);
    navbarState.scrollTimeout = null;
  }
}

// ============================================================================
// DROPDOWN HOVER MANAGEMENT
// ============================================================================

/*
 ! Initialize hover behavior for dropdown menus on desktop
 ! Only works on screens larger than the desktop breakpoint
*/
export function navbarHoverOpen(): void {
  const dropdownToggles = document.querySelectorAll('.nav_menu_dropdown-toggle');

  // Clean up existing listeners
  cleanupDropdownListeners();

  // Skip hover functionality on mobile/tablet
  if (!isDesktop()) {
    return;
  }

  // Add hover listeners for each dropdown toggle
  for (const toggle of dropdownToggles) {
    const dropdownBody = toggle.nextElementSibling as HTMLElement;

    if (!dropdownBody?.classList.contains('nav_menu_dropdown-body')) {
      continue;
    }

    const mouseenterHandler = (): void => {
      dropdownBody.classList.add('w--open');
    };

    const mouseleaveHandler = (): void => {
      // Délai pour permettre à la souris de se déplacer vers le dropdown
      setTimeout(() => {
        // Vérifier si la souris est sur le dropdown body
        if (!dropdownBody.matches(':hover')) {
          dropdownBody.classList.remove('w--open');
        }
      }, 0);
    };

    // Ajouter un event listener sur le dropdown body lui-même
    const dropdownMouseleaveHandler = (): void => {
      // Vérifier si la souris n'est ni sur le toggle ni sur le dropdown
      setTimeout(() => {
        if (!toggle.matches(':hover') && !dropdownBody.matches(':hover')) {
          dropdownBody.classList.remove('w--open');
        }
      }, 0);
    };

    // Store handlers for cleanup
    navbarState.dropdownListeners.set(toggle, {
      mouseenter: mouseenterHandler,
      mouseleave: mouseleaveHandler,
      dropdownMouseleave: dropdownMouseleaveHandler,
    });

    // Add event listeners
    toggle.addEventListener('mouseenter', mouseenterHandler);
    toggle.addEventListener('mouseleave', mouseleaveHandler);
    dropdownBody.addEventListener('mouseleave', dropdownMouseleaveHandler);
  }
}

// ============================================================================
// MOBILE MENU MANAGEMENT
// ============================================================================

/*
 ! Handle mobile menu behavior and prevent body scroll when open
*/
export function navbarMobileOpen(): void {
  const mobileButton = document.querySelector('.nav_button-mobile.w-nav-button') as HTMLElement;

  if (!mobileButton) {
    return;
  }

  // Observer for mobile menu state changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target as HTMLElement;

        if (target.classList.contains('w--open')) {
          // Mobile menu opened - disable body scroll
          document.body.style.overflow = 'hidden';
        } else {
          // Mobile menu closed - restore body scroll
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Start observing mobile button class changes
  observer.observe(mobileButton, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

// ============================================================================
// RESPONSIVE POSITIONING
// ============================================================================

/*
 ! Manage navbar positioning based on screen size
 ! Ensures mega menu works properly on desktop
*/
export function navbarPositionManager(): void {
  const navMenu = document.querySelector('.nav_menu') as HTMLElement;
  const navbar = document.querySelector('.navbar') as HTMLElement;

  if (!navMenu) {
    return;
  }

  const adjustNavPosition = (): void => {
    if (isDesktop()) {
      // Desktop: static positioning for mega menu functionality
      navMenu.style.cssText = 'position: static; transform: ; display: ; height: ; overflow: ;';

      if (navbar) {
        navbar.style.cssText = 'position: ; z-index: ;';
      }
    } else {
      // Mobile: let Webflow handle styles
      navMenu.style.cssText = 'position: ; transform: ; display: ; height: ; overflow: ;';
    }
  };

  // Apply initial positioning
  adjustNavPosition();

  // Clean up existing resize listener
  if (navbarState.resizeListener) {
    window.removeEventListener('resize', navbarState.resizeListener);
  }

  // Create debounced resize handler
  let resizeTimeout: number;
  navbarState.resizeListener = (): void => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      adjustNavPosition();
      navbarHoverOpen(); // Reinitialize hover behavior
    }, RESIZE_DEBOUNCE);
  };

  window.addEventListener('resize', navbarState.resizeListener);
}

// ============================================================================
// SCROLL BEHAVIOR
// ============================================================================

/*
 ! Handle navbar visibility based on scroll direction
 ! Hides navbar when scrolling down, shows when scrolling up
 ! Auto-shows after 3 seconds of inactivity
*/
export function navbarScrollBehavior(): void {
  const navWrapper = document.querySelector('.nav_wrapper') as HTMLElement;

  if (!navWrapper) {
    return;
  }

  // Initialize navbar styles
  navWrapper.style.transition = 'transform 0.3s ease-in-out';
  navWrapper.style.transform = 'translateY(0)';

  // Clean up existing scroll listener
  if (navbarState.scrollListener) {
    window.removeEventListener('scroll', navbarState.scrollListener);
  }

  const updateNavbar = (): void => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - navbarState.lastScrollY;

    // Ignore small scroll movements
    if (Math.abs(scrollDifference) < SCROLL_THRESHOLD) {
      navbarState.ticking = false;
      return;
    }

    // Clear any existing timeout
    clearScrollTimeout();

    if (scrollDifference > 0 && currentScrollY > SCROLL_HIDE_OFFSET) {
      // Scrolling down - hide navbar
      navWrapper.style.transform = 'translateY(-100%)';

      // Auto-show after delay
      navbarState.scrollTimeout = setTimeout(() => {
        navWrapper.style.transform = 'translateY(0)';
      }, NAVBAR_SHOW_DELAY);
    } else if (scrollDifference < 0) {
      // Scrolling up - show navbar immediately
      navWrapper.style.transform = 'translateY(0)';
    }

    navbarState.lastScrollY = currentScrollY;
    navbarState.ticking = false;
  };

  // Optimized scroll handler with requestAnimationFrame
  navbarState.scrollListener = (): void => {
    if (!navbarState.ticking) {
      requestAnimationFrame(updateNavbar);
      navbarState.ticking = true;
    }
  };

  window.addEventListener('scroll', navbarState.scrollListener, { passive: true });
}
