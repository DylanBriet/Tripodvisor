const app = {

  newsletterShown: false,
  forbiddenDomains: [
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@cool.fr.nf',
    '@jetable.fr.nf',
    '@courriel.fr.nf',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@hide.biz.st',
    '@mymail.infos.st',
  ],
  sliderImages: [
    './img/canyon.jpg',
    './img/city.jpg',
    './img/nature.jpg',
    './img/ocean.jpg',
    './img/road.jpg',
    './img/ski.jpg',
  ],

  init(){
    app.getAppElements();
    app.createSlider();
    app.addEventListeners();
  },

  getAppElements(){
    // app.newsletterLinks = [{Node}, {Node}, {Node}]
    app.newsletterLinks = document.querySelectorAll('.newsletter-show-link');
    // app.newsletterCloseButton = {Node}
    app.newsletterCloseButton = document.querySelector('.newsletter__close');
    app.newsletterForm = document.querySelector('.newsletter__form');
    app.newsletterEmailField = document.querySelector('.newsletter__field');
    app.dialogError = document.querySelector('.dialog--error');
    app.dialogClose = document.querySelector('.dialog__close');
    app.dialogMessage = document.querySelector('.dialog__message');
    app.slider = document.querySelector('.slider');
    app.sliderPreviousButton = document.querySelector('#slider-previous');
    app.sliderNextButton = document.querySelector('#slider-next');
  },

  createSlider(){
    // Il faut boucler sur le tableau qui référence l'ensemble des images à implémenter dans le slider
    // Pour chaque image créer un élément <img> et l'attacher à l'élément "slider"
    app.sliderImages.forEach((imageUrl, indexImageUrl) => {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      // On ajoute la classe CSS slider__img
      imgElement.classList.add('slider__img');
      // Dans le cas ou c'est la première occurence d'image on ajoute également la classe qui la défini comme étant l'image active
      if(indexImageUrl === 0){
        imgElement.classList.add('slider__img--current');
      }
      app.slider.append(imgElement);
    });
  },

  addEventListeners(){
    /*
    for(let indexNode = 0; indexNode < app.newsletterLinks.length; indexNode+=1){
      app.newsletterLinks[indexNode].addEventListener('click', app.newsletterClickHandler);
    }
    */
    /*
    for(const newsletterLink of app.newsletterLinks){
      newsletterLink.addEventListener('click', app.newsletterClickHandler);
    }
    */
    // newsletterLink est un des élément récupérer via le querySelectorAll
    // donc un des élément du tableau app.newsletterLinks
    // On aurait pu l'appeler michel
    // app.newsletterLinks.forEach(/* function fléché anomnyme de callback */);
    app.newsletterLinks.forEach((newsletterLink) => {
      newsletterLink.addEventListener('click', app.newsletterClickHandler);
    });
    app.newsletterCloseButton.addEventListener('click', app.newsletterCloseButtonClickHandler);
    document.addEventListener('scroll', app.scrollHandler);
    app.newsletterForm.addEventListener('submit', app.newsletterFormSubmitHandler);
    app.dialogClose.addEventListener('click', app.dialogCloseClickHandler);
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

  newsletterFormSubmitHandler(event){
    // On récupère la valeur fourni par l'utilisateur
    const userEmailInput = app.newsletterEmailField.value;
    // on vérifie que cette valeur respecte nos règle de validité
    // On commence par isoler le domaine de l'email
    // ou faire une recherche sur l'email fourni et vérifier s'il contien un des dommaines interdits
    // Pour cela on va boucler sur touts les dommaine interdits et faire la vérification a chaque tour de boucle

    // Afin de pouvoir stopper la boucle dès qu'une erreur intervient on utilise une boucle algorithmique que l'on pourra stopper avec "break". Ce que l'on ne peut pas faire avec un forEach
    for(const forbiddenDomain of app.forbiddenDomains) {
      console.log(forbiddenDomain);
      if(userEmailInput.includes(forbiddenDomain)){
        // on annule la soumission du formulaire
        event.preventDefault();
        // alert('Désolé mais cet email est invalide');
        app.dialogMessage.textContent = 'Désolé mais cet email est invalide';
        app.dialogError.showModal();
        break;
      }
    }
  },

  dialogCloseClickHandler(event){
    // Ce comportement doit fonctionner sur toutes les boityes de dialog, donc il faut récupérer la boite de dialog de manière relative au bouton fermer
    const closeButton = event.target;
    closeButton.parentElement.close();
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