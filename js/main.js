/* js for Hamburger-menu */

const openMenu = document.querySelector('.ham-menu__img');
const hamburgerMenu = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.ham-exit__btn');
const hamMenuLink = document.querySelectorAll('.ham-menu__link');

let op = 0.2;

let increaseOp = function() {
  setTimeout(function() {
    if(hamburgerMenu.style.opacity < 1) {
      op += 0.2;
      hamburgerMenu.style.opacity = op;
      increaseOp();
    }
  }, 100);
}

openMenu.addEventListener('click', function(e){
  e.preventDefault();
  hamburgerMenu.style.display = 'flex';
  increaseOp();
});

let decreaseOp = function() {
  setTimeout(function() {
    if(hamburgerMenu.style.opacity > 0.1) {
      op -= 0.2;
      hamburgerMenu.style.opacity = op;
      hamburgerMenu.style.display = 'flex';
      decreaseOp();
    } else {
      hamburgerMenu.style.display = 'none';
    }
  }, 100);
}

closeMenu.addEventListener('click', function(e) {
  e.preventDefault();
  decreaseOp();
});

for (let i = 0; i < hamMenuLink.length; i++) {
  hamMenuLink[i].addEventListener('click', function() {
    decreaseOp();
  });
}

hamburgerMenu.addEventListener('click', function(e) {
  if (e.target === hamburgerMenu) {
    decreaseOp();
  }
});

/* js for burgers-slider */

const right = document.querySelector('.burgers__scroll-btn--right');
const left = document.querySelector('.burgers__scroll-btn--left');
const burgerSlider = document.querySelector('.burgers__sliders');

right.addEventListener('click', function(e) {
  loop('right', e);
});

left.addEventListener('click', function(e) {
  loop('left', e);
});

function loop(direction, e) {
  e.preventDefault();
  if (direction === 'right') {
    burgerSlider.appendChild(burgerSlider.firstElementChild);
  } else if (direction === 'left') {
    burgerSlider.insertBefore(burgerSlider.lastElementChild, burgerSlider.firstElementChild);
  };
};


/* js for team-Accordeon */

const teamAccTrigger = document.querySelectorAll('.team-accordeon__trigger');
const teamAccItem = document.querySelectorAll('.team-accordeon__item');
const teamAccList = document.querySelector('.team-accordeon__list');
const team  = document.querySelector('.team');
  
for (let i = 0; i < teamAccItem.length; i++) {
  teamAccItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (teamAccTrigger[i].classList.contains('team-accordeon__trigger--active')) {
      teamAccTrigger[i].classList.remove('team-accordeon__trigger--active');
    } else {
      for (let a = 0; a < teamAccTrigger.length; a++) {
        teamAccTrigger[a].classList.remove('team-accordeon__trigger--active');
        teamAccTrigger[i].classList.add('team-accordeon__trigger--active');
      }
    }
  });
};


/* js for menu-Accordeon */

const menuAccTrigger = document.querySelectorAll('.menu-accordeon__trigger');
const menuAccItem = document.querySelectorAll('.menu-accordeon__item');
const menuAccList = document.querySelector('.menu-accordeon__list');
const menu  = document.querySelector('.menu');
  
for (let i = 0; i < menuAccItem.length; i++) {
  menuAccItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (menuAccTrigger[i].classList.contains('menu-accordeon__trigger--active')) {
      menuAccTrigger[i].classList.remove('menu-accordeon__trigger--active');
    } else {
      for (let a = 0; a < menuAccTrigger.length; a++) {
        menuAccTrigger[a].classList.remove('menu-accordeon__trigger--active');
        menuAccTrigger[i].classList.add('menu-accordeon__trigger--active');
      }
    }
    menu.addEventListener('click', function(e) {
      if (e.target === menu) {
        menuAccTrigger[i].classList.remove('menu-accordeon__trigger--active');
      };
    });
  });
};


/* js for reviews */

const openReviews = document.querySelectorAll('.reviews__btn');
const overlayReviews = document.querySelector('.overlay-reviews');
const closeReviews = overlayReviews.querySelector('.reviews-exit__btn');
const overlayName = overlayReviews.querySelector('.overlay-reviews__name');
const overlayText = overlayReviews.querySelector('.overlay-reviews__text');

for (let i = 0; i < openReviews.length; i++) {
  openReviews[i].addEventListener('click', function(e) {
    e.preventDefault();
    overlayReviews.style.display = 'flex';

    let thisParent = this.parentNode;
    let name = thisParent.querySelector('.reviews__name').innerText;
    let text = thisParent.querySelector('.reviews__text p').innerText;

    overlayName.textContent = name;
    overlayText.textContent = text;
  });
};

closeReviews.addEventListener('click', function(e) {
  e.preventDefault();
  overlayReviews.style.display = 'none';
});

overlayReviews.addEventListener('click', function(e) {
  if (e.target === overlayReviews) {
    closeReviews.click();
  };
});

/* js for order-form */

const orderForm = document.querySelector('#order-form');
const sendOrder = document.querySelector('#send-order');
const overlayOrder = document.querySelector('.overlay-order');
const overlayClose = document.querySelector('.order-exit__btn');
let orderMessage = document.querySelector('.overlay-order__message');

sendOrder.addEventListener('click', function(e) {
  e.preventDefault();

  if (validateForm(orderForm)) {

    var formData = new FormData();
    formData.append('name', orderForm.elements.name.value);
    formData.append('phone', orderForm.elements.phone.value);
    formData.append('comment', orderForm.elements.comment.value);
    formData.append('to', 'email@mail.com');

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);
    xhr.addEventListener('load', function() {
    });
    overlayOrder.style.display = 'flex';
    console.log(xhr.response.messsage);
  } else {
    overlayOrder.style.display = 'flex';
    orderMessage.textContent = 'Сообщение не отправлено';
  }
});

overlayClose.addEventListener('click', function(e) {
  e.preventDefault();
  overlayOrder.style.display = 'none';
});

overlayOrder.addEventListener('click', function(e) {
  if (e.target === overlayOrder) {
    overlayClose.click();
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.to)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
};

function validateField(field) {
  return field.checkValidity();
};


/* $(document).ready(() => {

  $('.nav__link').on('click', e => {
    e.preventDefault();

    let result = $('.nav__link').outerWidth(true);

    console.log(result);
  });
}); */