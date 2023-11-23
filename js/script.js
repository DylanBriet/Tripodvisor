const app = {

  init(){
    app.getAppElements();
    app.addEventListeners();
  },

  getAppElements(){
    app.newsletterLinks = document.querySelectorAll('.newsletter-show-link');
    app.newsletterCloseButton = document.querySelector('.newsletter__close');
  },

  addEventListeners(){
    app.newsletterLinks.forEach((link) => {
      link.addEventListener('click', app.showNewsletterFrame);
    });
    app.newsletterCloseButton.addEventListener('click', app.hideNewsletterFrame);
  },

  showNewsletterFrame(event){
    event.preventDefault();
    document.querySelector('.newsletter').classList.remove('newsletter--hidden');
  },

  hideNewsletterFrame(event){
    document.querySelector('.newsletter').classList.add('newsletter--hidden');
  }

};

app.init();