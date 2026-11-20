# Installation prompt for another machine

Paste the block below into a DSH session on the target machine.

---

You are running DSH on a new machine. Install the **Hysentek** brand identity plugin for the DSH Web UI here.

**Public source:** https://github.com/hysentek/hysen-dsh-branding — stable version `v1.1.1`, bundle `@local/hysentek-branding`.

**Requirements:** DSH running with a Web profile; `pnpm` on the Host `PATH`. The repository is public, so no GitHub token is needed.

**Steps**

1. Check `pnpm --version` and confirm DSH is running with a Web profile.
2. Install the bundle with the `plugin_manager` tool:
   - `action: install_bundle`
   - `target: github:hysentek/hysen-dsh-branding#v1.1.1`
   - Fallback without git (release asset):
     `https://github.com/hysentek/hysen-dsh-branding/releases/download/v1.1.1/local-hysentek-branding-1.1.1.tgz`
3. Read the result: `application` must be `applied` and the bundle `enabled: true`. If you hit `HMR transactions cannot be nested`:
   - add `"@local/hysentek-branding"` to `dsh.profile.bundles` in the profile's `package.json` (after `@deepseek-ai/dsh-web-app`) and save it — the HMR watcher applies it;
   - if it still does not load, restart `dsh web`.
4. Verify the client registrations with `cordis_inspect_query` (platform `client`, provider `Slots`, method `listSubTree`) for each root:
   - `sidebar.brand.mark`
   - `sidebar.brand.name`
   - `conversation.hero.brand.mark`
   - `conversation.hero.frame`

   Each root must show an occupant with `registrant: "@local/hysentek-branding"`, `priority: -1`, `active: true`; the shipped `WC` entry (when present) must be `active: false`.
5. Verify the UI when visible: the sidebar shows the H monogram and `Hysentek AI`; the blank-session page shows the mark and the `Bố làm tất` headline; the Send button is indigo; the browser tab reads `… — Hysentek AI` with the new favicon.
6. If the client half did not arrive, reload the page once.

Do **not** modify the source or rebrand anything unless asked. To change the name or colors: clone the repo, edit `BRAND`/`TOKENS` in `client.js`, bump `version`, and reinstall from the clone.

**Report back:** the installed version, whether the bundle is enabled, which slots are active, and what remains visually unverified (no screenshots).
