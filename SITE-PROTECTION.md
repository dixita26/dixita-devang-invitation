# Site protection notes

The site now includes visitor-facing protection deterrents. These make casual copying harder, but they cannot make a public website completely uninspectable. Any asset delivered to a browser can ultimately be retrieved by a determined visitor through browser tools, network requests, screenshots, or recording.

## Changes made

### `components/Experience.tsx`

Added the `useSiteProtection()` hook. It currently blocks:

- Right-click context menus.
- Text selection.
- Dragging page assets.
- Copy and cut events.
- Common copy, save-source, and view-source shortcuts: `Ctrl/Cmd+C`, `Ctrl/Cmd+S`, `Ctrl/Cmd+U`.
- Common DevTools shortcuts: `F12`, `Ctrl/Cmd+Shift+I`, `Ctrl/Cmd+Shift+J`, and `Ctrl/Cmd+Shift+C`.

The hook is installed near the beginning of the `Experience` component and cleans up its event listeners when the page unmounts.

### `app/globals.css`

Added CSS rules that disable text selection and native dragging for the page, images, and video.

## How to remove the protection later

1. Open `components/Experience.tsx`.
2. Remove the complete `useSiteProtection()` function.
3. Remove `useSiteProtection();` from the beginning of the `Experience` component.
4. Open `app/globals.css`.
5. Remove `-webkit-user-drag: none;` from the universal `*` rule.
6. Remove `-webkit-user-select: none;` and `user-select: none;` from the `body` rule.
7. Remove the `img, video` rule that disables dragging.
8. Run `npx tsc --noEmit` and `npm run build` to verify the site.

## Important limitation

These protections are deterrents only. They do not protect original assets from a technically capable visitor. For real protection, keep private source assets off the public site, use appropriately sized/compressed delivery assets, and use server-side access control for genuinely private content.
