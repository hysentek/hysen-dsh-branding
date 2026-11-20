/**
 * Hysentek branding — the browser half of the bundle.
 *
 * Replaces the brand surfaces the Web UI exposes through its slots and
 * theme API:
 *   - the sidebar mark and wordmark (expanded row and collapsed rail),
 *   - the blank-session mark in front of the headline,
 *   - the hard-coded blank-home headline copy (when BRAND.headline is set),
 *   - the DeepSeek home decoration layer, replaced by a Hysentek aura,
 *   - the accent palette, stacking one theme-token layer over the active theme,
 *   - the browser tab title and icon.
 *
 * The tab title and icon are browser chrome rather than React output: the
 * shipped layout hard-codes its product title at build time and the shell HTML
 * hard-codes its favicon, so those two are synchronized here and restored when
 * the plugin unloads. Everything else renders through slots and theme tokens.
 *
 * Single slots resolve one cell by priority (lowest renders) and reject a
 * second registration in the same cell at the same priority, so the shadowing
 * registrations use -1. The hero mark is a shipped fallback rather than an
 * occupant; the home decoration is replaced by reusing its `pixel-whale` HOC
 * id, at -1 for the same cell rule.
 */
window.__ModuleLoader__.load({
  id: '@local/hysentek-branding',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /**
     * Primary identity constants. `shippedTitle` is the product title the
     * layout bundle appends to the session title; `productTitle` replaces it
     * in the browser tab.
     *
     * Rebranding also touches the monogram copies (the `Mark` rects below,
     * `FAVICON`, `icon.svg`, `docs/preview.svg`), the `TOKENS` palette, and
     * the locale copy — see the checklist in README.md.
     */
    const BRAND = {
      name: 'Hysentek',
      suffix: 'AI',
      productTitle: 'Hysentek AI',
      shippedTitle: 'DeepSeek Harness',
      headline: 'Bố làm tất',
    }

    /** Every built-in translation of `hero.headline`, used to locate the copy. */
    const SHIPPED_HEADLINES = new Set([
      'Into the Unknown',
      '探索未至之境',
      '未知への挑戦',
      'Hacia lo desconocido',
      "Dans l'inconnu",
      'Ins Unbekannte',
      'В неизвестность',
      'Para o desconhecido',
    ])

    /** Identity-layer name recorded by the theme registry. */
    const SOURCE = '@local/hysentek-branding'

    /**
     * Brand palette. Semantic accents follow the active light/dark scheme; the
     * `--hysentek-*` variables are this plugin's own ink so the inline artwork
     * changes with the theme too. Values stay paired, as the theme service
     * requires one value per scheme.
     *
     * The `state-business-primary` and `brand-primary-new-color*` tokens keep
     * focus rings, selections, and tab/dock accents on-brand; both are internal
     * names, so a rename only degrades those accents to the shipped color.
     */
    const TOKENS = {
      '--dsw-alias-brand-primary': { light: '#4F46E5', dark: '#A5B4FC' },
      '--dsw-alias-button-primary-hover': { light: '#4338CA', dark: '#93A0FF' },
      '--dsw-alias-button-info-fill': { light: '#4F46E5', dark: '#7C86F5' },
      '--dsw-alias-button-info-hover': { light: '#4338CA', dark: '#6366F1' },
      '--dsw-alias-link': { light: '#4338CA', dark: '#A5B4FC' },
      '--dsw-alias-state-business-primary': { light: '#4F46E5', dark: '#A5B4FC' },
      '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#4F46E5', dark: '#818CF8' },
      '--dsw-specific-sidebar-fill': { light: '#F7F7FC', dark: '#1B1B24' },
      '--hysentek-mark-from': { light: '#6366F1', dark: '#818CF8' },
      '--hysentek-mark-to': { light: '#0891B2', dark: '#22D3EE' },
      '--hysentek-aura-primary': { light: 'rgba(79, 70, 229, 0.10)', dark: 'rgba(129, 140, 248, 0.16)' },
      '--hysentek-aura-secondary': { light: 'rgba(8, 145, 178, 0.09)', dark: 'rgba(34, 211, 238, 0.10)' },
    }

    /**
     * App icon for the browser tab: the H monogram knocked out of a brand tile.
     * A tile reads at 16 px where a bare gradient glyph would fade.
     */
    const FAVICON = 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">'
      + '<defs><linearGradient id="g" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">'
      + '<stop offset="0" stop-color="#6366F1"/><stop offset="1" stop-color="#0891B2"/></linearGradient></defs>'
      + '<rect width="36" height="36" rx="9" fill="url(#g)"/>'
      + '<g fill="#FFFFFF"><rect x="10.8" y="9.5" width="4.68" height="17" rx="1.58"/>'
      + '<rect x="20.52" y="9.5" width="4.68" height="17" rx="1.58"/>'
      + '<rect x="8.78" y="16.49" width="18.43" height="3.02" rx="1.51"/></g></svg>',
    )

    /**
     * The Hysentek monogram: two rounded pillars joined by a pill crossbar that
     * overhangs them, filled with the brand gradient. Geometry is authored on a
     * 36-unit square with 5.2 units of side margin so it reads at 24 px and 34 px.
     * @param props - `size` from the owning slot, optional host `className`.
     * @returns the inline monogram.
     */
    function Mark({ size = 24, className }) {
      const gradientId = 'hysentek-mark-' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '')
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 36 36',
        className,
        'aria-hidden': 'true',
        focusable: 'false',
        style: { display: 'block', flex: 'none', overflow: 'visible' },
      },
      h('defs', null,
        h('linearGradient', {
          id: gradientId,
          x1: '5.2',
          y1: '6.2',
          x2: '30.8',
          y2: '29.8',
          gradientUnits: 'userSpaceOnUse',
        },
        h('stop', { offset: '0', style: { stopColor: 'var(--hysentek-mark-from, #6366F1)' } }),
        h('stop', { offset: '1', style: { stopColor: 'var(--hysentek-mark-to, #0891B2)' } }))),
      h('g', { fill: 'url(#' + gradientId + ')' },
        h('rect', { x: 8, y: 6.2, width: 6.5, height: 23.6, rx: 2.2 }),
        h('rect', { x: 21.5, y: 6.2, width: 6.5, height: 23.6, rx: 2.2 }),
        h('rect', { x: 5.2, y: 15.9, width: 25.6, height: 4.2, rx: 2.1 })))
    }

    /**
     * Hero mark: the monogram, plus the brand's blank-home headline. DSH
     * hard-codes `hero.headline` with no slot and rejects a second registration
     * of a shipped locale namespace, so this component replaces that one text
     * node inside its own headline row and restores it on unmount. Only the
     * shipped headline strings are matched: another language's copy is left
     * alone rather than guessed.
     * @param props - mark size and host class from the slot owner.
     * @returns the mark plus the copy patch.
     */
    function HeroMark({ size, className }) {
      const anchor = React.useRef(null)
      React.useEffect(() => {
        const custom = BRAND.headline.trim()
        if (custom === '') return undefined
        /** Nearest ancestor of the mark whose text carries the headline. */
        const carriesHeadline = (element) => {
          const text = element.textContent
          if (text === null) return false
          for (const shipped of SHIPPED_HEADLINES) if (text.includes(shipped)) return true
          return false
        }
        let row = anchor.current?.parentElement ?? null
        for (let depth = 0; depth < 5 && row !== null && !carriesHeadline(row); depth++) {
          row = row.parentElement
        }
        if (row === null) return undefined
        /** Text nodes this effect rewrote, with their shipped values. */
        const originals = new Map()
        const apply = () => {
          const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT)
          let node
          while ((node = walker.nextNode()) !== null) {
            const text = node.nodeValue
            if (text === null) continue
            const shipped = text.trim()
            if (shipped === custom || !SHIPPED_HEADLINES.has(shipped)) continue
            if (!originals.has(node)) originals.set(node, text)
            node.nodeValue = text.replace(shipped, custom)
          }
        }
        const observer = new MutationObserver(apply)
        observer.observe(row, { childList: true, characterData: true, subtree: true })
        apply()
        return () => {
          observer.disconnect()
          for (const [node, text] of originals) {
            if (node.isConnected && node.nodeValue?.trim() === custom) node.nodeValue = text
          }
        }
      }, [])
      return h('span', { ref: anchor, style: { display: 'inline-flex', flex: 'none' } },
        h(Mark, { size, className }))
    }

    /**
     * Wordmark that replaces the shipped brand name beside the mark. The brand
     * font is pinned so a user content-font setting cannot reshape the identity,
     * and the qualifier is a ruled suffix rather than a boxed chip: the whole
     * row is a New Session button, so a bordered pill would read as a control.
     * @returns the name and its AI qualifier.
     */
    function BrandName() {
      return h('span', {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0',
          height: '24px',
          minWidth: 0,
          whiteSpace: 'nowrap',
          fontFamily: 'var(--dsw-font-family-brand, inherit)',
        },
      },
      h('span', {
        style: {
          fontSize: '17px',
          fontWeight: 500,
          letterSpacing: '0',
          lineHeight: '24px',
          color: 'var(--dsw-alias-label-primary)',
        },
      }, BRAND.name),
      h('span', {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          height: '14px',
          marginLeft: '7px',
          paddingLeft: '7px',
          borderLeft: '1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 32%, transparent)',
          color: 'var(--dsw-alias-brand-primary)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          lineHeight: '14px',
        },
      }, BRAND.suffix))
    }

    /**
     * Home frame layer: replaces the shipped whale layer (`pixel-whale`) and
     * tints the blank home with the brand, staying behind the Conversation.
     * @param props - `hero` from the owner, wrapped `children` scroll body.
     * @returns a layout-neutral frame.
     */
    function HomeLayer({ hero, children }) {
      return h('div', { style: { display: 'contents' } },
        hero
          ? h('div', {
            'aria-hidden': 'true',
            style: {
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              pointerEvents: 'none',
              background: 'radial-gradient(58% 42% at 50% 24%, var(--hysentek-aura-primary, rgba(79, 70, 229, 0.10)), transparent 72%), '
                + 'radial-gradient(42% 36% at 76% 76%, var(--hysentek-aura-secondary, rgba(8, 145, 178, 0.09)), transparent 74%)',
            },
          })
          : null,
        children)
    }

    /**
     * Brand the browser tab: rewrite the shipped product title wherever the
     * layout puts it, and swap the tab icons for the brand tile.
     * @returns cleanup restoring the shipped chrome.
     */
    function installBrowserChrome() {
      let disposed = false

      /** Keep the layout's own title format, replacing only the product part. */
      const syncTitle = () => {
        if (disposed) return
        const current = document.title
        if (!current.endsWith(BRAND.shippedTitle)) return
        document.title = current.slice(0, current.length - BRAND.shippedTitle.length) + BRAND.productTitle
      }
      const head = document.head
      const observer = new MutationObserver(syncTitle)
      observer.observe(head, { childList: true, subtree: true, characterData: true })
      syncTitle()

      const icons = Array.from(document.querySelectorAll('link[rel~="icon"]'))
      const previous = icons.map(link => ({
        link,
        rel: link.getAttribute('rel'),
        href: link.getAttribute('href'),
        media: link.getAttribute('media'),
        type: link.getAttribute('type'),
      }))
      for (const { link } of previous) {
        link.setAttribute('rel', 'icon')
        link.setAttribute('type', 'image/svg+xml')
        link.removeAttribute('media')
        link.setAttribute('href', FAVICON)
      }
      let created = null
      if (previous.length === 0) {
        created = document.createElement('link')
        created.setAttribute('rel', 'icon')
        created.setAttribute('type', 'image/svg+xml')
        created.setAttribute('href', FAVICON)
        head.appendChild(created)
      }

      return () => {
        disposed = true
        observer.disconnect()
        for (const { link, rel, href, media, type } of previous) {
          if (rel === null) link.removeAttribute('rel')
          else link.setAttribute('rel', rel)
          if (href === null) link.removeAttribute('href')
          else link.setAttribute('href', href)
          if (media === null) link.removeAttribute('media')
          else link.setAttribute('media', media)
          if (type === null) link.removeAttribute('type')
          else link.setAttribute('type', type)
        }
        if (created !== null) created.remove()
        // Restore only the product segment, so a Session title that happens to
        // end with the brand string is not rewritten.
        const title = document.title
        const branded = title === BRAND.productTitle || title.endsWith(' — ' + BRAND.productTitle)
        if (branded) {
          document.title = title.slice(0, title.length - BRAND.productTitle.length) + BRAND.shippedTitle
        }
      }
    }

    /**
     * Mount the identity: one theme layer, the browser chrome, and the brand
     * seats. Priority -1 shadows the shipped single-slot entries (lowest renders)
     * and keeps the replacement HOC in its own cell.
     * @param ctx - Client root context.
     */
    function apply(ctx) {
      ctx.effect(() => ctx.theme.overrideTokens(SOURCE, TOKENS), 'hysentek: brand token layer')
      ctx.effect(installBrowserChrome, 'hysentek: browser chrome')

      ctx.slots.inject('conversation.hero.frame', () => ctx.slots.register({
        name: 'conversation.hero.frame',
        id: 'pixel-whale',
        priority: -1,
        registrant: SOURCE,
      }, HomeLayer))

      ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({
        name: 'conversation.hero.brand.mark',
        priority: -1,
        registrant: SOURCE,
      }, HeroMark))

      ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({
        name: 'sidebar.brand.mark',
        priority: -1,
        registrant: SOURCE,
      }, Mark))

      ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({
        name: 'sidebar.brand.name',
        priority: -1,
        registrant: SOURCE,
      }, BrandName))
    }

    return { inject: ['slots', 'theme'], apply }
  },
})
