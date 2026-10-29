
(function () {
  // Smooth internal anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');

      if (targetId && targetId !== '#') {
        var el = document.querySelector(targetId);

        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Contact form submission using Formspree
  var contactForm = document.getElementById('portfolio-contact-form');
  var feedbackEl = document.getElementById('form-feedback');
  var submitBtn = document.getElementById('submit-btn');

  if (contactForm && feedbackEl && submitBtn) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        feedbackEl.className =
          'px-space-sm py-2 rounded font-label-sm text-label-sm bg-error-container text-on-error-container block';

        feedbackEl.textContent = 'Please fill out all required fields.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75');
      submitBtn.innerText = 'Sending Message...';

      try {
        var response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          feedbackEl.className =
            'px-space-sm py-2 rounded font-label-sm text-label-sm bg-tertiary-container/30 text-tertiary-fixed block';

          feedbackEl.textContent =
            'Thank you, ' + name + '! Your message has been sent successfully.';

          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        feedbackEl.className =
          'px-space-sm py-2 rounded font-label-sm text-label-sm bg-error-container text-on-error-container block';

        feedbackEl.textContent =
          'Sorry, your message could not be sent. Please try again later.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
        submitBtn.innerHTML =
          '<span>Send Message</span><span class="material-symbols-outlined text-[18px]">send</span>';
      }
    });
  }
})();
