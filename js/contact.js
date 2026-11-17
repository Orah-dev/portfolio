/**
 * COS 106 - Introduction to Web Technologies
 * Script: js/contact.js
 * Contact form client-side validation fulfilling all PDF requirements:
 * 1. No field is empty
 * 2. Email format is valid
 * 3. Phone number contains only digits
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactFormValidation();
});

function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Form Fields
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const messageInput = document.getElementById('messageText');
  const successAlert = document.getElementById('contactSuccessAlert');

  // Regex Patterns
  // Standard email validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Strictly only digits (as per requirement: "Phone number contains only digits")
  const phoneDigitsOnlyRegex = /^\d+$/;

  /**
   * Set field to error state with a custom message
   */
  function setError(inputEl, message) {
    const fieldContainer = inputEl.closest('.form-field');
    if (!fieldContainer) return;

    fieldContainer.classList.add('has-error');
    fieldContainer.classList.remove('is-valid');

    const feedbackEl = fieldContainer.querySelector('.input-feedback');
    if (feedbackEl) {
      feedbackEl.textContent = message;
    }
  }

  /**
   * Clear error and set field to valid state
   */
  function setValid(inputEl) {
    const fieldContainer = inputEl.closest('.form-field');
    if (!fieldContainer) return;

    fieldContainer.classList.remove('has-error');
    fieldContainer.classList.add('is-valid');

    const feedbackEl = fieldContainer.querySelector('.input-feedback');
    if (feedbackEl) {
      feedbackEl.textContent = '';
    }
  }

  /**
   * Clear all error/valid states
   */
  function resetValidationStates() {
    const fields = contactForm.querySelectorAll('.form-field');
    fields.forEach(field => {
      field.classList.remove('has-error', 'is-valid');
      const feedback = field.querySelector('.input-feedback');
      if (feedback) feedback.textContent = '';
    });
  }

  /**
   * Validate Name Field
   */
  function validateName() {
    const val = nameInput.value.trim();
    if (val === '') {
      setError(nameInput, 'Full Name is required and cannot be empty.');
      return false;
    }
    if (val.length < 2) {
      setError(nameInput, 'Please enter at least 2 characters for your name.');
      return false;
    }
    setValid(nameInput);
    return true;
  }

  /**
   * Validate Email Field
   */
  function validateEmail() {
    const val = emailInput.value.trim();
    if (val === '') {
      setError(emailInput, 'Email Address is required and cannot be empty.');
      return false;
    }
    if (!emailRegex.test(val)) {
      setError(emailInput, 'Please enter a valid email address format (e.g. name@example.com).');
      return false;
    }
    setValid(emailInput);
    return true;
  }

  /**
   * Validate Phone Number Field
   * Requirement: "Phone number contains only digits"
   */
  function validatePhone() {
    const val = phoneInput.value.trim();
    if (val === '') {
      setError(phoneInput, 'Phone Number is required and cannot be empty.');
      return false;
    }
    if (!phoneDigitsOnlyRegex.test(val)) {
      setError(phoneInput, 'Phone number must contain only digits (no spaces, hyphens, or letters).');
      return false;
    }
    if (val.length < 7 || val.length > 15) {
      setError(phoneInput, 'Phone number must contain between 7 and 15 digits.');
      return false;
    }
    setValid(phoneInput);
    return true;
  }

  /**
   * Validate Message Field
   */
  function validateMessage() {
    const val = messageInput.value.trim();
    if (val === '') {
      setError(messageInput, 'Message is required and cannot be empty.');
      return false;
    }
    if (val.length < 10) {
      setError(messageInput, 'Message is too short. Please provide at least 10 characters.');
      return false;
    }
    setValid(messageInput);
    return true;
  }

  // Real-time input validation on blur / input
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', () => {
    if (nameInput.closest('.form-field').classList.contains('has-error')) {
      validateName();
    }
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-field').classList.contains('has-error')) {
      validateEmail();
    }
  });

  phoneInput.addEventListener('blur', validatePhone);
  phoneInput.addEventListener('input', () => {
    if (phoneInput.closest('.form-field').classList.contains('has-error')) {
      validatePhone();
    }
  });

  messageInput.addEventListener('blur', validateMessage);
  messageInput.addEventListener('input', () => {
    if (messageInput.closest('.form-field').classList.contains('has-error')) {
      validateMessage();
    }
  });

  // Form Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide any previous success alert
    if (successAlert) successAlert.classList.remove('active');

    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    // Check overall validity
    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

    if (!isFormValid) {
      // Focus the first invalid element
      const firstInvalid = contactForm.querySelector('.form-field.has-error .form-control');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Success State
    if (successAlert) {
      successAlert.classList.add('active');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset Form inputs and validation styling
    contactForm.reset();
    setTimeout(() => {
      resetValidationStates();
    }, 1500);
  });
}
