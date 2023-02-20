/**
 * This file could perfectly be empty.
 *
 * But we use "ngx-build-plus:browser" builder to compile our remotes.
 * The build options in angular.json dictate that if you are building
 * a project as an application, there must be a reference to main.ts.
 *
 * Otherwise you would get this error:
 *
 * ```bash
 *  Data path "" must have required property 'main'.
 * ```
 *
 * Therefore thise file must exist, but never really
 * do anything with it.
 *
 * We leave `import('./bootstrap');` for consistency.
 */

import('./bootstrap');
