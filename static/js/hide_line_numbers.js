'use strict';

// Hide the line-number gutter without going through pad.changeViewOption.
//
// Earlier revisions called `pad.changeViewOption('showLineNumbers', false)`
// here, which works in isolation but has a nasty side-effect: core's
// changeViewOption reads pad.padOptions, applies the one key being
// changed, then re-runs setViewOptions for *all* options — falling
// back to defaults for anything not persisted to pad.padOptions.
//
// The URL parameter `?rtl=true` is set by core via
// `pad.changeViewOption('rtlIsTrue', true)` in pad.ts:postAceInit
// *before* our hook fires, but core's changeViewOption doesn't write
// rtlIsTrue back to pad.padOptions either — so when we later fire our
// own changeViewOption call, the rtl override is lost and the
// #options-rtlcheck checkbox flips back to unchecked.
//
// This broke rtl_url_param.spec.ts when ep_hide_line_numbers was
// installed (#7658 surfaced the line-numbers half of the problem; this
// is the other half).
//
// Fix: skip changeViewOption entirely. Tell ace directly + sync the
// settings checkbox. No cascade through setViewOptions, so other
// in-flight options (including the URL-derived rtl) are untouched.
exports.postAceInit = (hook, context) => {
  context.ace.setProperty('showslinenumbers', false);
  $('#options-linenoscheck').prop('checked', false);
};
