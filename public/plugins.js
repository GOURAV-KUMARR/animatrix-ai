/* ============================================================================
   ANIMATRIX LIVE PATCH & PLUGINS FILE (plugins.js)
   Future changes, new presets, or new features get appended here automatically
   without needing to rewrite the main application!
   ============================================================================ */
window.ANIMATRIX_PATCHES = window.ANIMATRIX_PATCHES || [];
window.registerAnimatrixPatch = function(patchFn) {
  window.ANIMATRIX_PATCHES.push(patchFn);
};
