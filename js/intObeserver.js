const useImageIntersectionObserver = (callback, delay = 0, threshold) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            callback(entry.target); 
            observer.unobserve(entry.target);
          }, delay);
        }
      });
    }, {threshold});
  
    return observer;
  };
  

  document.querySelectorAll('.col-md-4').forEach((col, index) => {
    var threshold = .05;
    let delay
    const callback = (target) => {
      target.style.transform = "translateY(0px)";
    };

    
    const observer = useImageIntersectionObserver(callback, delay, threshold);
  
    observer.observe(col);
  });
  