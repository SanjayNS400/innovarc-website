const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('is-open', !expanded);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
}));

document.querySelectorAll('.work-tab').forEach(tab => tab.addEventListener('click', () => {
  const filter = tab.dataset.filter;
  document.querySelectorAll('.work-tab').forEach(item => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

const inquiryForm = document.querySelector('#inquiry-form');
inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const data = new FormData(inquiryForm);
  const subject = encodeURIComponent(`InnovArc project enquiry — ${data.get('space')}`);
  const body = encodeURIComponent(`Hello InnovArc,\n\nMy name is ${data.get('name')}.\nEmail: ${data.get('email')}\nSpace: ${data.get('space')}\n\n${data.get('message') || 'I would like to discuss a project.'}\n\nThank you.`);
  document.querySelector('#form-note').textContent = 'Opening your email app with your project note…';
  window.location.href = `mailto:info@innovarcdesigns.com?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.section-heading,.project-card,.promise-copy,.promise-image,.method-head,.method-content,.contact-copy,.contact-form').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
