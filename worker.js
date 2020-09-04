
// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB_Nglab4XFv5WuzSuUoUg0MTDSehDgUJk",
    authDomain: "assistprodatabase.firebaseapp.com",
    databaseURL: "https://assistprodatabase.firebaseio.com",
    projectId: "assistprodatabase",
    storageBucket: "assistprodatabase.appspot.com",
    messagingSenderId: "856578818550",
    appId: "1:856578818550:web:28a42553814ab29de187d7",
    measurementId: "G-2KR739JWYE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.app().storage("gs://assistprodatabase.appspot.com");
var storageRef = storage.ref();

//AddSection("Dress", "Dress.jpg", 1);
//AddSection("Steph", "Steph.png", 1);

function AddSection(name, thumbnail, count){

  storageRef.child(thumbnail).getDownloadURL().then(function(url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    image_width = 0;

    getMeta(url, function(width, height) {
    image_width = width;
    });

  class_id = 'col-6 col-md-6 col-lg-3'
  if( image_width > 1000){
    class_id = 'col-6 col-md-6 col-lg-6';
  }
  
    var div = document.getElementById("main_row");
    div.innerHTML += "<div class=\""+ class_id 
    + "\" data-aos=\"fade-up\"> <a href=\"single\" class=\"d-block photo-item\"> <img src=\""+ url 
    + "\" alt=\"Image\" class=\"img-fluid\"> <div class=\"photo-text-more\"> <div class=\"photo-text-more\"> <h3 class=\"heading\">" 
    + name + "</h3> <span class=\"meta\">"+ count +" Photos</span> </div> </div> </a> </div>";

  });
}

function getMeta(url, callback) {
  var img = new Image();
  img.src = url;
  img.onload = function() { callback(this.width, this.height); }
}