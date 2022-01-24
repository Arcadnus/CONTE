  const newStoryBtn = document.getElementById('SLBtn');
  const newStoryCircle = document.getElementById('SLCircle');
  const logoBtn = document.getElementById('logoBtn');
  const perfilTab = document.getElementById('perfilTab');
  const perfilOut = document.getElementById('perfilOut');


  //function to logout
    perfilOut.addEventListener('click', esconderPerfil);
    newStoryCircle.addEventListener('click', redirect);
    newStoryBtn.addEventListener('click', redirect);
    logoBtn.addEventListener('click', mostrarPerfil);

function esconderPerfil() {
  if (perfilTab.style.top == "0px") {
    console.log('escondendo Perfil');
    perfilTab.style.top = "-50vh";
    perfilOut.style.display = "none";
  }else{
    console.log('nada feito');
  }
}

function mostrarPerfil() {
  perfilTab.style.top = "0px";
  perfilOut.style.display = "block";
}

function redirect(){
  window.location.href = "newStory.html?";
}

//o Firebase é iniciado pelo arquivo auth.js

  //checar se o usuario tá logado ou não
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser);
        // do something when he log in, like show any elements that's supposed to be seen ONLY when logged in
        // console.log(firebaseUser.email);
        console.log(firebaseUser.uid);          
            var ref = database.ref('user/' + firebaseUser.uid+'/contos').orderByChild('nome');
            ref.on('value', pegarData, erroData)
            console.log(firebaseUser);
            console.log(firebaseUser.displayName);
            /*
            //update profile
            var user = firebase.auth().currentUser;

            user.updateProfile({
              displayName: "Diogo Misawa"
            }).then(function() {
              // console.log(firebaseUser.displayName);
            }).catch(function(error) {
              // An error happened.
            });*/

            console.log("looking at:");
            console.log('user/' + firebaseUser.uid+'/contos');
            function pegarData(data) {
              // console.log(data.val());
              //salva um objeto com a lista de todos os contos
              var contos = data.val();
              //Id de todos os contos
              var contosIds = Object.keys(contos);
              // console.log(contosIds);
              //trabalhar com cada conto individualmente
              for (var i = 0; i < contosIds.length; i++) {
                //
                var k = contosIds[i];

                var nome = contos[k].nome;
                var sala = contos[k].sala;
                console.log(nome, sala);
                //criação do item
                var txt1 = 
                  "<div class='storyItem'>" +
                    "<div class='storyDivEsq'>" +
                    "</div>" +
                    "<div class='storyDivDir'>" +
                      "<p class='storyTitle'>" + nome + "</p>" +
                      "<p class='storyClass'>" + sala + "</p>" +
                      "<a href='editar'>" +
                        "<div class='storyEditBtn orange'>EDITAR</div>" +
                      "</a>" +
                      "<a href='#'>" +
                        "<div class='storyShareBtn'>COMPARTILHAR</div>" +
                      "</a>" +
                    "</div>" +
                  "</div>";               // Create element with HTML 
                $(".container").append(txt1);      // Append the new elements
              }
            }
            function erroData(err) {
              console.log(err);
            }
      }else{
        console.log('not logged in');
        // do something when he's NOT logged in, like hide user info or elements for people that are logged in
        window.location.href = "index.html";
      };
    });