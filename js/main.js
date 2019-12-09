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
