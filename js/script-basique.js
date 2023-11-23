const app = {

  init(){
    document.querySelectorAll('.newsletter-show-link').forEach((link) => {
      link.addEventListener('click', app.showNewsletterFrame);
    });
    document.querySelector('.newsletter__close').addEventListener('click', hideNewsletterFrame);
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