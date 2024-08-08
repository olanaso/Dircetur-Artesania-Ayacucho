import '../proceso-compra/style.css';




$(document).ready(function () {
    var currentStep = 1;

    function showStep(step) {
      $('.step').removeClass('active');
      $('#step' + step).addClass('active');
      $('.stepper-item').removeClass('active');
      $('.stepper-item').slice(0, step).addClass('active');
    }

    $('.next').click(function () {
      currentStep++;
      showStep(currentStep);
    });

    $('.prev').click(function () {
      currentStep--;
      showStep(currentStep);
    });

    $('#multiStepForm').on('submit', function (e) {
      e.preventDefault();
      alert('Form submitted!');
      // Add form submission logic here
    });
  });