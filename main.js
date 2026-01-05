// Navigation configuration
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/athariq', label: 'Āthariq' },
  { path: '/founder', label: 'Founder' },
  { path: '/contact', label: 'Contact' }
];

// External URLs (to be configured in production)
const EXTERNAL_URLS = {
  athariq: 'https://athariq.com', // Update with actual URL
  founder: 'https://yaseenjacobs.com' // Update with actual URL
};

// Initialize app
function init() {
  renderNavigation();
  handleRouting();
  window.addEventListener('popstate', handleRouting);
  
  // Handle clicks on internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Handle internal links (starting with /) or links with data-navigate
    if (href.startsWith('/') || link.hasAttribute('data-navigate')) {
      // Skip if it's an external link that happens to start with /
      if (link.hostname && link.hostname !== window.location.hostname) {
        return;
      }
      e.preventDefault();
      navigateTo(href);
    }
  });
}

// Render navigation
function renderNavigation() {
  const nav = document.getElementById('navigation');
  if (!nav) return;

  // Logo container - using single logo instead of logo with text
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });
  const logoImg = document.createElement('img');
  logoImg.src = '/Nuriya Logo Vector.png';
  logoImg.alt = 'Nūriya Studio';
  logoImg.className = 'logo-text';
  logoImg.onerror = function() {
    // Fallback to Studios logo if vector logo doesn't load
    if (this.src !== '/Nuriya Studios Logo.png') {
      this.src = '/Nuriya Studios Logo.png';
    }
  };
  logoLink.appendChild(logoImg);
  logoContainer.appendChild(logoLink);
  nav.appendChild(logoContainer);

  const ul = document.createElement('ul');
  navLinks.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.path;
    a.textContent = link.label;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.path);
    });
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
}

// Navigate to route
function navigateTo(path) {
  window.history.pushState({}, '', path);
  handleRouting();
}

// Handle routing
function handleRouting() {
  const path = window.location.pathname;
  const main = document.getElementById('main-content');
  if (!main) return;

  // Update active nav link (including logo links)
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === path || (path === '/' && href === '/')) {
      a.classList.add('active');
    }
  });

  // Clear content
  main.innerHTML = '';

  // Load page module
  let pageModule;
  switch (path) {
    case '/':
      pageModule = import('./pages/home.js');
      break;
    case '/work':
      pageModule = import('./pages/work.js');
      break;
    case '/athariq':
      pageModule = import('./pages/athariq.js');
      break;
    case '/founder':
      pageModule = import('./pages/founder.js');
      break;
    case '/contact':
      pageModule = import('./pages/contact.js');
      break;
    default:
      pageModule = import('./pages/home.js');
  }

  pageModule
    .then(module => {
      if (module.default) {
        main.innerHTML = module.default(EXTERNAL_URLS);
      }
    })
    .catch(err => {
      console.error('Error loading page:', err);
      main.innerHTML = '<div class="loading">Error loading page. Please refresh.</div>';
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

