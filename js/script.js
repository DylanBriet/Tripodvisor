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
  sliderPreviousButton: null,
  sliderNextButton: null,
  dots: [],

  init(){
    app.getAppElements();
    app.createSlider();
    app.animateSlider();
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
  },

  createSlider(){
    // Ajout de images
    app.sliderImageElements = app.sliderImages.map((imageUrl, imagUrlIndex) => {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.classList.add('slider__img');
      if(imagUrlIndex === 0){
        app.sliderCurrentImageIndex = imagUrlIndex;
        imgElement.classList.add('slider__img--current');
      }
      return imgElement;
    });
    app.slider.append(...app.sliderImageElements);// [elem1, elem2, elem3] ==> elem1, elem2, elem3

    // Ajout des bouton next et previous
    app.sliderPreviousButton = document.createElement('button');
    app.sliderPreviousButton.type = 'button';
    app.sliderPreviousButton.ariaLabel = 'Précédent';
    app.sliderPreviousButton.classList.add('btn', 'slider__btn');
    app.sliderPreviousButton.innerHTML = '&lt;';

    app.sliderNextButton = document.createElement('button');
    app.sliderNextButton.type = 'button';
    app.sliderNextButton.ariaLabel = 'Suivant';
    app.sliderNextButton.classList.add('btn', 'slider__btn');
    app.sliderNextButton.innerHTML = '&gt;';

    // Ajout des puces
    app.sliderNav = document.createElement('div');
    app.sliderNav.classList.add('slider__nav');
    app.sliderImageElements.forEach((_,index) => {
      const dot = document.createElement('span');
      dot.classList.add('slider__nav-item');
      if(index===0){
        dot.classList.add('active');
      }
      dot.dataset.index = index;
      app.sliderNav.append(dot);
      app.dots.push(dot);
    });

    // On ajoute les outils au slider
    app.slider.append(app.sliderPreviousButton, app.sliderNextButton, app.sliderNav);
  },

  animateSlider(){
    // setInterval perment d'executer une fonction en boucle timé
    app.sliderAnimation = setInterval(app.sliderNext, 10000);
  },

  sliderNext(){
    // On récupère l'élément courant en se servant de l'index courant et on lui retire la classe
    app.sliderImageElements[app.sliderCurrentImageIndex].classList.remove('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.remove('active');

    // On incrémente l'index courant de 1
    app.sliderCurrentImageIndex +=1;

    // On vérifie que l'index esiste bien, n'est pas supérieur à la longueur du tableau référençant l'ensemble des images
    if(app.sliderCurrentImageIndex > (app.sliderImageElements.length - 1)){
      app.sliderCurrentImageIndex = 0;
    }

    // On ajoute la classe à l'élément courant
    app.sliderImageElements[app.sliderCurrentImageIndex].classList.add('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.add('active');
  },

  sliderPrevious(){
    app.sliderImageElements[app.sliderCurrentImageIndex].classList.remove('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.remove('active');
    app.sliderCurrentImageIndex -=1;
    if(app.sliderCurrentImageIndex < 0){
      app.sliderCurrentImageIndex = app.sliderImageElements.length - 1;
    }
    console.log(app.sliderImageElements, app.sliderCurrentImageIndex);
    app.sliderImageElements[app.sliderCurrentImageIndex].classList.add('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.add('active');
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
    app.sliderNextButton.addEventListener('click', app.sliderNext);
    app.sliderPreviousButton.addEventListener('click', app.sliderPrevious);
    app.sliderNav.addEventListener('click', app.sliderNavClickHandler);
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
    app.newsletterShown = true;
    document.querySelector('.newsletter').classList.remove('newsletter--hidden');
  },

  hideNewsletterFrame(){
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
  },

  sliderNavClickHandler(event){
    const dot = event.target;
    if(dot.classList.contains('slider__nav-item')){
      app.sliderImageElements[app.sliderCurrentImageIndex].classList.remove('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.remove('active');
      app.sliderCurrentImageIndex = dot.dataset.index;
      app.sliderImageElements[app.sliderCurrentImageIndex].classList.add('slider__img--current');app.dots[app.sliderCurrentImageIndex].classList.add('active');
    }
  }

};

//app.init();
document.addEventListener('DOMContentLoaded', app.init);