  var pagina = 1
  var corpo = document.body.style;
  var msg = document.getElementById('msg');

  function nextBg() {
    // body...
    if (pagina<13) {
      pagina ++;
    }else{
    pagina = 1;
    };

    corpo.backgroundImage = "url('img/bg/cropped/bg_"+pagina+".jpg')";
    console.log("inserindo imagem numero: "+pagina);
    msg.innerHTML = "inserindo imagem numero: "+pagina;
  }

  function prevBg() {
    // body...
    if (pagina>1) {
      pagina --;
    }else{
    pagina = 13;
    };
    corpo.backgroundImage = "url('img/bg/cropped/bg_"+pagina+".jpg')";
    console.log("Exibindo imagem numero: "+pagina);
    msg.innerHTML = "Exibindo imagem numero: "+pagina;
  }