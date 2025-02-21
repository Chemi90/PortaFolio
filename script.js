document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  
    const formData = new FormData(form);
  
    fetch('https://formspree.io/f/xldrkjyd', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Mensaje enviado correctamente');
          form.reset();
        } else {
          alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
  });
  