const app = {

  newsletterShown: false,

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
      link.addEventListener('click', app.newsletterClickHandler);
    });
    app.newsletterCloseButton.addEventListener('click', app.newsletterCloseButtonClickHandler);
    document.addEventListener('scroll', app.scrollHandler);
  },

  newsletterClickHandler(event){
    event.preventDefault();
    app.showNewsletterFrame();
  },

  newsletterCloseButtonClickHandler(event){
    // Le fait de créer une function intermédiaire de gestion d'evenement, permet d'ajouter d'autes action si on le souhaite que de caché l'encart de newsletter
    app.hideNewsletterFrame();
    // Si l'utilisateur décide de fermer le popup, on peux désactiver la gestion d'affichage sur scroll, histoire de pas l'énerver
    document.removeEventListener('scroll', app.scrollHandler);
  },

  showNewsletterFrame(){
    console.log('show');
    app.newsletterShown = true;
    document.querySelector('.newsletter').classList.remove('newsletter--hidden');
  },

  hideNewsletterFrame(){
    console.log('hide');
    app.newsletterShown = false;
    document.querySelector('.newsletter').classList.add('newsletter--hidden');
  },

  scrollHandler(event){
    // ! attention gestion de scroll s'exécute énormement a chaque scroll, il est donc conseillé de limiter au maxim le nombre d'exécution d'instruction
    if(window.scrollY > 300 && !app.newsletterShown){
      app.showNewsletterFrame();
    } else if(window.scrollY < 300 && app.newsletterShown) {
      app.hideNewsletterFrame();
    }
  }

};

app.init();