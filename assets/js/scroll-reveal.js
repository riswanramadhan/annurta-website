(function () {
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

  if (!revealElements.length) {
    return;
  }

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer = null;

  const stopObserver = () => {
    if (!observer) {
      return;
    }

    revealElements.forEach((element) => observer.unobserve(element));
    observer.disconnect();
    observer = null;
  };

  const startObserver = () => {
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isElementVisible = entry.isIntersecting || entry.intersectionRatio > 0;

        if (isElementVisible) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10%'
    });

    revealElements.forEach((element) => observer.observe(element));
  };

  const handlePreferenceChange = () => {
    if (reduceMotionQuery.matches) {
      stopObserver();
      revealElements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
      return;
    }

    revealElements.forEach((element) => {
      element.classList.remove('reveal-visible');
    });

    stopObserver();
    startObserver();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handlePreferenceChange, { once: true });
  } else {
    handlePreferenceChange();
  }

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handlePreferenceChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handlePreferenceChange);
  }
})();