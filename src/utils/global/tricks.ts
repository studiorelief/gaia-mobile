/*
 *============================================================================
 * TRICKS : PROJETS OPTIMISATIONS
 *============================================================================
 */

export function hideDynListIfEmpty() {
  const dynLists = document.querySelectorAll('.w-dyn-list[if-empty="hide"]');

  if (dynLists.length === 0) {
    return;
  }

  dynLists.forEach((list) => {
    const isEmpty = list.querySelector('.w-dyn-empty') !== null;

    if (isEmpty && list instanceof HTMLElement) {
      list.style.display = 'none';
    }
  });
}

export function toggleSelectCustomActive() {
  const selectToggles = document.querySelectorAll('.form_selectcustom_text');

  if (selectToggles.length === 0) {
    return;
  }

  // Fonction pour vérifier et appliquer la classe is-active
  const checkAndToggleActive = (toggle: HTMLElement) => {
    if (toggle.textContent?.trim() !== 'Sélectionner dans la liste') {
      toggle.classList.add('is-active');
    } else {
      toggle.classList.remove('is-active');
    }
  };

  selectToggles.forEach((toggle) => {
    if (toggle instanceof HTMLElement) {
      // Vérification initiale
      checkAndToggleActive(toggle);

      // Ajouter un event listener pour surveiller les changements de contenu
      const observer = new MutationObserver(() => {
        checkAndToggleActive(toggle);
      });

      // Observer les changements de contenu textuel et d'attributs
      observer.observe(toggle, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  });
}
