export function initAutoTabs(): void {
  // Sélectionner tous les conteneurs de tabs
  const tabContainers = document.querySelectorAll('.layout-tabs_tabs-menu');

  tabContainers.forEach((container) => {
    const tabLinks = container.querySelectorAll('.layout-tabs_tabs-link');

    if (tabLinks.length <= 1) return; // Pas besoin de rotation s'il y a 1 ou 0 onglets

    let currentIndex = 0;
    let intervalId: number;

    // Trouver l'index de l'onglet actuellement actif
    tabLinks.forEach((link, index) => {
      if (link.classList.contains('w--current')) {
        currentIndex = index;
      }
    });

    // Fonction pour démarrer/redémarrer l'intervalle
    const startInterval = () => {
      // Clear l'ancien intervalle s'il existe
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Démarrer un nouvel intervalle
      intervalId = setInterval(switchToNextTab, 6000);
    };

    // Fonction pour passer à l'onglet suivant
    const switchToNextTab = () => {
      // Retirer w--current de l'onglet actuel
      tabLinks[currentIndex].classList.remove('w--current');

      // Passer à l'onglet suivant (avec boucle)
      currentIndex = (currentIndex + 1) % tabLinks.length;

      // Ajouter w--current au nouvel onglet
      tabLinks[currentIndex].classList.add('w--current');

      // Déclencher l'événement click pour activer le contenu correspondant
      (tabLinks[currentIndex] as HTMLElement).click();
    };

    // Fonction pour gérer le clic manuel sur un onglet
    const handleTabClick = (clickedIndex: number) => {
      // Retirer w--current de tous les onglets
      tabLinks.forEach((link) => {
        link.classList.remove('w--current');
      });

      // Ajouter w--current à l'onglet cliqué
      tabLinks[clickedIndex].classList.add('w--current');

      // Mettre à jour l'index actuel
      currentIndex = clickedIndex;

      // Redémarrer l'intervalle depuis cette nouvelle position
      startInterval();
    };

    // Ajouter les event listeners pour les clics manuels
    tabLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        handleTabClick(index);
      });
    });

    // Démarrer la rotation automatique
    startInterval();
  });
}
