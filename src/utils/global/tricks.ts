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

export function mapMonths() {
  const monthMap: { [key: string]: string } = {
    '01': 'Janvier',
    '02': 'Février',
    '03': 'Mars',
    '04': 'Avril',
    '05': 'Mai',
    '06': 'Juin',
    '07': 'Juillet',
    '08': 'Août',
    '09': 'Septembre',
    '10': 'Octobre',
    '11': 'Novembre',
    '12': 'Décembre',
  };

  const elementsWithMonth = document.querySelectorAll('.date_month');

  if (elementsWithMonth.length === 0) {
    return;
  }

  elementsWithMonth.forEach((element) => {
    if (element instanceof HTMLElement) {
      const currentText = element.textContent?.trim();

      if (currentText && monthMap[currentText]) {
        element.textContent = monthMap[currentText];
      }
    }
  });
}

export function copyUrl() {
  const copyButton = document.querySelector('#copy-url') as HTMLElement;
  const copiedText = document.querySelector('.share_copied-text') as HTMLElement;

  if (!copyButton || !copiedText) return;

  copyButton.addEventListener('click', () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);

    // Set initial state and show element
    copiedText.style.transform = 'translateY(-1rem)';
    copiedText.style.opacity = '0';
    copiedText.style.display = 'flex';
    copiedText.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    // Force reflow to ensure initial state is applied
    // copiedText.offsetHeight;

    // Animate to visible state
    copiedText.style.transform = 'translateY(0rem)';
    copiedText.style.opacity = '1';

    // Return to initial state after 2 seconds
    setTimeout(() => {
      copiedText.style.transform = 'translateY(-1rem)';
      copiedText.style.opacity = '0';

      // Hide element after animation completes
      setTimeout(() => {
        copiedText.style.display = 'none';
      }, 300);
    }, 2000);
  });
}
