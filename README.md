# Hysentek branding

Brand identity for a DeepSeek Harness deployment: the surfaces the Web UI
exposes are branded as Hysentek through its slots and theme API, and the shipped
identity returns when the bundle is disabled.

## What changes

| Surface | Shipped | With this bundle |
| --- | --- | --- |
| Sidebar mark (expanded row and collapsed rail) | DeepSeek whale | Hysentek H monogram, theme-aware gradient |
| Sidebar name | DeepSeek wordmark | `Hysentek` wordmark in the brand font, with an `AI` qualifier |
| Blank-session mark before the headline | DeepSeek whale | Hysentek monogram |
| Blank-home headline | `Into the Unknown` | `Bố làm tất` (`BRAND.headline`) |
| Blank-home decoration | Pixel-whale canvas layer | Static Hysentek brand aura |
| Primary accents | DeepSeek blue/neutrals | Indigo-to-cyan for primary and send buttons, links, focus rings, selected states, tab/dock accents, and the sidebar tint (light and dark pairs) |
| Browser tab title | `… — DeepSeek Harness` | `… — Hysentek AI` |
| Browser tab icon | DSH favicon | Hysentek tile icon |
| Plugins panel row | — | Hysentek title, description, icon, detail image |

The palette layer stacks over whichever theme is active, so switching
**Appearance** between light and dark keeps the Hysentek values.

## Usage

The bundle installs as a profile plugin. Open the **Plugins** panel in the
sidebar and keep **Hysentek branding** enabled. Disabling or removing it restores
the shipped branding and the original tab title and icon. The running page
follows a profile change without a reload; if a toggle reports an HMR transaction
error, add or remove `@local/hysentek-branding` in the profile's
`dsh.profile.bundles` (`<profile>/package.json`) instead — the profile watcher
applies it the same way.

No Host service, tool, stored data, model request, or network call is added. The
browser half only registers slot entries, one theme-token layer, and the tab
title/icon synchronization.

## Deploy to another machine

The repository root is the bundle package: `package.json` declares the patch and
the client half, and nothing is installed from the npm registry. Requirements:

- DSH with a Web profile (built and tested against `0.2.2-rc.5`).
- `pnpm` on the Host's `PATH` — Plugin Manager runs it for installs.
- Network access to this repository; it is private, so the machine needs a
  credential (SSH key or git credential helper) for the git address.

Install it from the **Plugins** panel → **Add plugin** and enter one of:

| Source | Spec to enter |
| --- | --- |
| GitHub shorthand | `github:hysentek/hysen-dsh-branding` |
| Git over SSH | `git+ssh://git@github.com/hysentek/hysen-dsh-branding.git` |
| Git over HTTPS | `git+https://github.com/hysentek/hysen-dsh-branding.git` |
| A local clone | the absolute path to the cloned directory |
| The packed tarball | `npm pack` in this directory, then the absolute `.tgz` path |

A git spec accepts a tag or commit fragment, such as
`github:hysentek/hysen-dsh-branding#v1.1.0`, to pin a deployment to a release.

Then keep **Hysentek branding** enabled in the Plugins panel. The open page
applies the bundle when its client half arrives; reload once if it does not.
Verify the sidebar mark/wordmark, the blank-home mark and headline, the Send
button color, and the browser tab title and icon.

To ship an update, bump `version` in `package.json`, commit and push, then remove
and re-add the bundle on the other machine (a git install pins the commit it was
installed from).

## Customize

The monogram appears in four places, and they must stay in sync:

- `client.js` — the `Mark` rects (the live mark) and the `FAVICON` data URI;
- `icon.svg` — the Plugins panel icon;
- `docs/preview.svg` — the detail-page illustration.

Edit the `BRAND` and `TOKENS` constants at the top of [`client.js`](client.js),
then reload the page:

- `BRAND.name`, `BRAND.suffix`, `BRAND.productTitle` — name, qualifier, and tab
  title (`BRAND.shippedTitle` is the product title the layout appends to the
  session title).
- `BRAND.headline` — the blank-home headline (default `Bố làm tất`); leave it
  empty to keep DSH's own copy.
- `TOKENS['--hysentek-mark-from' | '--hysentek-mark-to']` — monogram gradient.
- `TOKENS['--dsw-alias-brand-primary']` and the paired `-hover`/info entries —
  accent colors, each with a light and dark value.
- `TOKENS['--dsw-specific-sidebar-fill']` — sidebar tint.

Also update `locale/en.json` and `locale/vi.json` (`meta.title`,
`meta.description`, and the English detail image alt text in `docs/DETAIL.md`),
plus `package.json`'s description and this README. The Vietnamese metadata is
used when the UI runs a `vi` language pack; DSH ships no `vi` locale today.

## Limitations

- The tab title and icon are browser chrome, not React output: the layout bundle
  hard-codes the product title and the shell HTML hard-codes the favicons, so
  this plugin rewrites `document.title` and the `rel="icon"` links, and restores
  both when it unloads. The title is only rewritten when it ends with
  `DeepSeek Harness`; a deployment built with its own `DSH_CLIENT_TITLE` keeps
  that title unless `BRAND.shippedTitle` is changed.
- The blank-home headline has no slot, and DSH rejects a second registration of
  an existing locale namespace. The plugin therefore replaces that one text node
  inside the hero row (anchored by its own mark) and restores it on unload; it
  only matches DSH's shipped translations, so new copy or a language the plugin
  does not list keeps DSH's headline. Other hard-coded copy — settings labels
  and the PWA manifest (`manifest.webmanifest`, apple-touch-icon) — is unchanged.
- The shipped whale layer is replaced by reusing its slot id (`pixel-whale`),
  which is the documented HOC replacement path. The whale's click-to-play
  animation goes with it; the replacement aura is static.
- The accent overrides are a brand subset, not a full recolor: chart series,
  file-type icons, text selection, and status colors keep their shipped palette.
- Dark mode uses one token as both the send-button fill (white glyph) and the
  foreground of a small question badge; the indigo pair keeps the send glyph at
  the shipped contrast level, which leaves that badge around 3.8:1.
- The theme-override API accepts arbitrary paired token names, but the names
  outside the inspected token list are internal: a rename only drops that accent
  back to the shipped color.
