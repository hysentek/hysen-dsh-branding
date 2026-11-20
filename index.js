/**
 * Host half of the Hysentek branding bundle.
 *
 * The bundle exists so the profile lists it and enables it; every visible
 * change lives in the browser half (`./client`), which owns the brand seats,
 * the theme accent layer, and the browser chrome. No Host service, tool, or
 * stored data is added.
 */

/** Activate the bundle row; the Client half does the work. */
export function apply() {}
