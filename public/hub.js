class MyButtonEffect {
    constructor() {
      this.buttons = document.querySelectorAll('.my-button');
      this.attachEvents();
    }
  
    attachEvents() {
      this.buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          button.classList.add('highlight');
        });
  
        button.addEventListener('mouseleave', () => {
          button.classList.remove('highlight');
        });
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const buttonDescriptions = document.querySelectorAll(".button-description");
  
    buttonDescriptions.forEach(function(description) {
      description.addEventListener("click", function() {
        const link = this.dataset.link;
        if (link) {
          window.open(link, "_blank");
        }
      });
    });
  });
  

  