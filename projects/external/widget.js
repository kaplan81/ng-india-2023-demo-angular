// @ts-check
'use-strict';

function setWidget(number) {
  const exposedMfePath = `projects/mfes/src/lib/containers/mfe${number}/mfe${number}.component`;
  const hostElelementWrapper = document.getElementById('host');
  if (hostElelementWrapper !== null) {
    const hasChildNodes = hostElelementWrapper.hasChildNodes();
    if (hasChildNodes) {
      while (hostElelementWrapper.firstChild) {
        hostElelementWrapper.removeChild(hostElelementWrapper.firstChild);
      }
    }
    try {
      const fragment = document
        .createRange()
        .createContextualFragment(`<shl-host component="${exposedMfePath}"></shl-host>`);
      hostElelementWrapper.appendChild(fragment);
    } catch (error) {
      console.error('Error while loading snippet:::', error);
    }
  }
}
