document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const placeholder = document.getElementById('bgPlaceholder');
    video.addEventListener('canplaythrough', function() {
        video.style.opacity = '1';        
        setTimeout(() => {
        placeholder.style.visibility='hidden'
        }, 1000); 
    }, false);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY >= window.innerHeight) {
            video.style.position = 'fixed';
        } else {
            video.style.position = 'absolute';
        }
    });
});