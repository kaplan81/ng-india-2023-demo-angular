import { loadRemoteEntry } from '@angular-architects/module-federation';

loadRemoteEntry({ type: 'module', remoteEntry: 'http://localhost:4201/remoteEntry.js' }).then(() =>
  import('./bootstrap').catch((err) => console.error(err)),
);
