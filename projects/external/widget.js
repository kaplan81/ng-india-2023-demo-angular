// @ts-check
'use-strict';

function setWidget(id, attrs) {
  if (attrs.exposed === undefined) {
    throw Error('exposed is a mandatory attribute');
  }
  const ngWidgets = document.getElementsByClassName('ng-widget');
  if (ngWidgets.length > 0) {
    for (const ngWidget of ngWidgets) {
      const hostElelementWrapper = ngWidget.querySelector(`#${id}`);
      if (hostElelementWrapper !== null) {
        const hasChildNodes = hostElelementWrapper.hasChildNodes();
        if (hasChildNodes) {
          while (hostElelementWrapper.firstChild) {
            hostElelementWrapper.removeChild(hostElelementWrapper.firstChild);
          }
        }
        try {
          const element = document.createElement('shl-host');
          for (const [key, value] of Object.entries(attrs)) {
            element.setAttribute(key, value);
          }
          const fragment = document.createRange().createContextualFragment(element.outerHTML);
          hostElelementWrapper.appendChild(fragment);
        } catch (error) {
          console.error('Error while loading snippet:::', error);
        }
      }
    }
  }
}
