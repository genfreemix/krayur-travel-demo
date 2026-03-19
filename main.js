const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealElements.forEach((element) => revealObserver.observe(element));

const leadForm = document.querySelector('#lead-form');
const formNote = document.querySelector('#form-note');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const name = String(formData.get('name') || '').trim();
  const contact = String(formData.get('contact') || '').trim();
  const interest = String(formData.get('interest') || '').trim();
  const brief = String(formData.get('brief') || '').trim();

  const body = [
    'Здравствуйте, хочу обсудить маршрут с Kayur Travel.',
    '',
    `Имя/группа: ${name}`,
    `Контакт: ${contact}`,
    `Интерес: ${interest}`,
    `Бриф: ${brief || 'Уточню в переписке.'}`,
  ].join('\n');

  const mailtoUrl = `mailto:Kayur-Travel@mail.ru?subject=${encodeURIComponent('Заявка с протопрезсайта Kayur Travel')}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;

  if (formNote) {
    formNote.textContent = 'Черновик письма сформирован. Если почтовый клиент не открылся, используйте адрес Kayur-Travel@mail.ru.';
  }
});