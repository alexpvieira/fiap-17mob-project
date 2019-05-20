let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/');
xhr.responseType = 'json';
xhr.send();



xhr.onload = function () {
  console.log(xhr.status);
  console.log(xhr.response);
  //alert(xhr.response.results[0].name)
  var totalJson1 = xhr.response.results.length;
  //alert(totalJson1);

  var div = document.getElementById("tabelaPoke");
  for (var i = 0; i < totalJson1; i++) {



    div.innerHTML += "<td>" + xhr.response.results[i].name + "</td>" + "<td><a href =' " + xhr.response.results[i].url + "' target='_blank'><button class='btn btn-success'> Acessar dados </button> </a> </td>";







  }



};




