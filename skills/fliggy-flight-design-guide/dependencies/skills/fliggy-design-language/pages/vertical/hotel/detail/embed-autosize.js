(function () {
  const params = new URLSearchParams(window.location.search);
  const embedded = params.has("embed") && window.parent !== window;

  if (!embedded) {
    return;
  }

  const key = params.get("component") || document.title || window.location.pathname;
  let rafId = 0;

  function getMeasuredElement() {
    if (document.body && document.body.firstElementChild) {
      return document.body.firstElementChild;
    }

    return document.documentElement;
  }

  function getElementHeight(element) {
    if (!element) {
      return 0;
    }

    const rect = element.getBoundingClientRect();
    return Math.max(
      rect.height || 0,
      element.scrollHeight || 0,
      element.offsetHeight || 0,
      element.clientHeight || 0
    );
  }

  function measureHeight() {
    const measuredElement = getMeasuredElement();
    const height = getElementHeight(measuredElement);

    window.parent.postMessage(
      {
        type: "component-height",
        key,
        height: Math.ceil(height),
      },
      "*"
    );
  }

  function scheduleMeasure() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () {
      measureHeight();
      requestAnimationFrame(measureHeight);
    });
  }

  const resizeObserver = new ResizeObserver(scheduleMeasure);
  resizeObserver.observe(getMeasuredElement());

  if (document.body) {
    resizeObserver.observe(document.body);
  }

  const mutationObserver = new MutationObserver(scheduleMeasure);
  mutationObserver.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
  });

  window.addEventListener("load", scheduleMeasure, { passive: true });
  window.addEventListener("resize", scheduleMeasure, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleMeasure);
  }

  scheduleMeasure();
  setTimeout(scheduleMeasure, 0);
  setTimeout(scheduleMeasure, 200);
  setTimeout(scheduleMeasure, 800);
})();
