/**
 * COS 106 - Introduction to Web Technologies
 * Global Script: js/main.js
 * Handles responsive navigation, modal previews, and active page detection
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initProjectDemoModal();
  updateDynamicYear();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Simulated Live Demo Modal for Projects
 */
function initProjectDemoModal() {
  const demoButtons = document.querySelectorAll('[data-demo-target]');
  const modal = document.getElementById('demoModal');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-project-title') || 'Project Showcase';
      const desc = btn.getAttribute('data-project-desc') || 'Interactive simulated preview loaded successfully.';

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Click outside modal to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/**
 * Dynamic Current Year in Footer
 */
function updateDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
