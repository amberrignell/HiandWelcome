window.addEventListener('load', () => {
    var burger = document.querySelector("#burger");
    var menu = document.querySelector(".menuHeader");
    var mainContainer = document.querySelector(".mainContainer");
    var smiling = document.querySelector(".smiling");
    var riddle = document.querySelector(".riddle");
    var playPause = document.querySelector("#playPause");

    // When the burger is clicked, add the class 'isOpen' to menuHeader
    burger.addEventListener("click", function () {
    menu.classList.toggle('isOpen');
    })

  //get all elements of the page with the class 'text' (returns an HTML collection)
  //get the tectContent of each element and reassign it with it's encrypted equivalent
  function encryptPage() {
    var text = document.getElementsByClassName("text");
    for (let i=0; i<text.length; i++) {
      text[i].textContent = encrypt(text[i].textContent);
    }
    console.log('page encrypted');
  }

  function decryptPage() {
    console.log('i got here');
    var text = document.getElementsByClassName("text");
    for (let i=0; i<text.length; i++) {
      text[i].textContent = decrypt(text[i].textContent);
    }
    console.log(text);
    console.log('page decrypted');
    mainContainer.classList.add('isDecrypted');
    smiling.classList.add('showImage');
    riddle.classList.add('hideRiddle');
  }
  //
  // encryption function
  //replaces each character in a string with the number wich is their UTF-16 code unit,
  //then turns this number into a string of base 16
  function encrypt (str){
    let newStr = '';
    let b = 'a';
    for (let i=0; i < str.length; i++) {
        b = str[i].charCodeAt().toString(16);
        newStr = newStr + b;
    }
    return newStr;
    mainContainer.classList.remove('isDecrypted');
  }
  //
  // // decryption function
  // // puts elements of string into an array, 2 characters at a time
  // // switches strings of base 16 back into numbers
  // // replaces UTF-16 units with their associated characters, then joins them all together as a string
  function decrypt(str) {
    console.log(str);
    var a = [];
    do{ a.push(str.substring(0, 2)) }
    while( (str = str.substring(2, str.length)) != "" );
    console.log(a);
    a = a.map( x => parseInt(x,16));
    a = a.map (x => String.fromCharCode(x))
    return a.join('');
    }


  encryptPage();

  //Typewriter effect on welcome message
  var i = 0;
  var typeWriterMessage = "2048692046414320637265772c2077656c636f6d6520746f206d792077656273697465203a292020";
  var welcomeMessage = document.getElementById("welcomeMessage");
  var speed = 90;

  function typeWriter() {
    if (i < typeWriterMessage.length) {
      welcomeMessage.innerHTML += typeWriterMessage.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();


  document.getElementById("submit").addEventListener("click", function () {
    var answer = document.getElementById("riddleAnswer");
    console.log(answer);
    if (answer.value === 'shadow') { decryptPage()} else {alert ("Wrong answer - Try again !");};
  })
  document.getElementById("iGiveIn").addEventListener("click", function() {
    decryptPage();
  });
})



// scripts for the image carousel
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var playSlides = setInterval(function(){
  plusSlides(1); }, 3000);

  playPause.addEventListener("click", function () {
    clearInterval(playSlides);
  })

window.addEventListener('keydown', keyPressCheck); 
  function keyPressCheck(event) {
    console.log('keys');
  if (event.keyCode === 37) {
      plusSlides(-1);
  } else if (event.keyCode === 39) {
      plusSlides(1);
  } else if (event.keyCode === 32) {
      event.preventDefault();
      clearInterval(playSlides);
  }
}
