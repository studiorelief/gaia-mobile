export default function loadScript(src: string, fsList?: boolean, module?: boolean) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    // Définir le type de script selon le paramètre module
    if (module !== false) {
      script.type = 'module';
    }

    // Ajouter l'attribut fs-list si demandé
    if (fsList) {
      script.setAttribute('fs-list', '');
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

export function loadAttributesScripts() {
  // Finsweet Libraries
  loadScript(
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js',
    false,
    true
  );
  loadScript(
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js',
    false,
    true
  );
  loadScript(
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsselect@1/cmsselect.js',
    false,
    true
  );
  loadScript(
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js',
    false,
    true
  );
  // Finsweet Attributes V2
  loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js', true, true);
  // FlowPlay+ - Video
  loadScript(
    'https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/Media%20Player/flowplayplus.js',
    false,
    false
  );
}
