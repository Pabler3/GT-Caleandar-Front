document.addEventListener('DOMContentLoaded', (setupSPA) => {
  function setupSPA() {
    const mainContainer = document.getElementById('app');
    const navLinks = document.querySelectorAll('.nav-link');

    async function loadPage(url) {
      try {
        const response = await fetch(url);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const newContent = doc.querySelector('#app').innerHTML;

        mainContainer.innerHTML = newContent;
        window.history.pushState({}, '', url);
        
        setupSPA();
      } catch (error) {
        console.error('Error al cargar la página:', error);
      }
    }

    navLinks.forEach(link => {
      link.removeEventListener('click', handleNavClick); 
      link.addEventListener('click', handleNavClick, { once: true });
    });

    function handleNavClick(event) {
      event.preventDefault();
      const url = event.currentTarget.getAttribute('href');
      loadPage(url);
    }

    window.onpopstate = () => {
      loadPage(window.location.pathname);
    };
  }
});
