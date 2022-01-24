var salaSelected, salaSelectedName;


    $( document ).ready(function() {
      $('.dropdown').click(function () {
          $('#classList').slideToggle();
      });
      $('.dropdown').focusout(function () {
          $(this).removeClass('active');
          $(this).find('.dropdown-menu').slideUp(300);
      });
      $('.dropdown .dropdown-menu li').click(function () {
          $(this).parents('.dropdown').find('span').text($(this).text());
          $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
      });

      $('.dropdown-menu li').click(function () {
        salaSelected = $(this).parents('.dropdown').find('input').val();
        salaSelectedName = $(this).text();
        selectSala(salaSelected, salaSelectedName);
      }); 
    });

    function selectSala(msg, msgName) {
      //acontecer algo ao selecionar uma sala
      console.log(msg);
      console.log(msgName);
    }
