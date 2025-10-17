(function () {
  const revealElements = document.querySelectorAll('[data-reveal]');

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
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, {
      threshold: 0.2
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

  handlePreferenceChange();

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handlePreferenceChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handlePreferenceChange);
  }
})();
