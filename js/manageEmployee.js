var data = [
  {
    "id": 10001,
    "birthDate": "1953-09-01",
    "firstName": "Georgi",
    "lastName": "Facello",
    "gender": "M",
    "hireDate": "1986-06-25",
  },
  {
    "id": 10002,
    "birthDate": "1964-06-01",
    "firstName": "Bezalel",
    "lastName": "Simmel",
    "gender": "F",
    "hireDate": "1985-11-20",
  },
  {
    "id": 10003,
    "birthDate": "1959-12-02",
    "firstName": "Parto",
    "lastName": "Bamford",
    "gender": "M",
    "hireDate": "1986-08-27T22:00:00.000+0000",
  },
  {
    "id": 10004,
    "birthDate": "1954-04-30",
    "firstName": "Chirstian",
    "lastName": "Koblick",
    "gender": "M",
    "hireDate": "1986-11-30",

  },
  {
    "id": 10005,
    "birthDate": "1955-01-20",
    "firstName": "Kyoichi",
    "lastName": "Maliniak",
    "gender": "M",
    "hireDate": "1989-09-11T22:00:00.000+0000",

  }
];

var nextId = 10006;


function updateEmployees() {
    var rows = "";

    var css_class = "dim-background";
    var cls = "";
    var counter = 0;

    $.each(data, function (key, value) {
      if(counter % 2 == 0){
        cls = css_class;
      }
      counter++;
      rows += "<tr class='"+ cls +"' id='row-"+ value.id +"'>";

      //id
      rows += "<td>" + value.id + "</td>";

      //nome
      rows += "<td><span id='name-"+ value.id+"'>" + value.firstName + "</span><input type='text' class='display-none' id='input-name-"+ value.id+"'  placeholder='"+value.firstName+"'></td>";
      
      //cognome
      rows += "<td><span id='lastname-"+ value.id+"'>" + value.lastName + "</span><input type='text' class='display-none' id='input-lastname-"+ value.id+"' placeholder='"+value.lastName+"'></td>";

      //azione
      rows += "<td>" + "<button class='change-button' id='change-"+value.id+"' onclick='change(" + value.id + ")'>Cambia</button>" + 
                      "<button class='delete-button' id='" + value.id + "' onclick='removeEmployee(" + value.id + ")'>Cancella</button>"
            "</td>"; //invece che usare l'onclick etc si poteva usare data-id (funzionalità di jquery che ci permette di cliccare e eseguire)
      rows += "</tr>";
      cls = "";
    });
    $("#to-fill").html(rows);
}

function change(id){
  $("#name-"+id).addClass("display-none");
  $("#input-name-"+id).removeClass("display-none");

  $("#lastname-"+id).addClass("display-none");
  $("#input-lastname-"+id).removeClass("display-none");

  $("#change-"+id).removeClass("change-button");
  $("#change-"+id).addClass("save-button");
  $("#change-"+id).text("Salva");
  $("#change-"+id).attr("onclick", "save("+id+")");
}

function save(id){
  //visibilità varie
  $("#name-"+id).removeClass("display-none");
  $("#input-name-"+id).addClass("display-none");

  $("#lastname-"+id).removeClass("display-none");
  $("#input-lastname-"+id).addClass("display-none");

  $("#change-"+id).removeClass("save-button");
  $("#change-"+id).addClass("change-button");
  $("#change-"+id).text("Cambia");
  $("#change-"+id).attr("onclick", "change("+id+")");

  let newName = $("#input-name-"+id).val();
  let newLastname = $("#input-lastname-"+id).val();

  //cambiamenti
  if(newName == ""){
    newName = $("#name-"+id).text();
  }

  if(newLastname == ""){
    newLastname = $("#lastname-"+id).text();
  }

  $("#name-"+id).text(newName);
  $("#lastname-"+id).text(newLastname);
  changeNames(newName, newLastname, id);

  $("#input-name-"+id).attr("placeholder", newName);
  $("#input-lastname-"+id).attr("placeholder", newLastname);

  $("#input-name-"+id).val("");
  $("#input-lastname-"+id).val("");
}

function changeNames(name, lastname, id){
  $.each(data, function(key,value){
    if(value.id == id){
      value.firstName = name;
      value.lastName = lastname;
    }
  });
}

function removeEmployee(id){
  $.each(data, function(key, value){
    if(value.id == id){
      data.splice(key, 1);
      $("#" + id).closest("tr").remove(); //this option needs a recolor of the rows
      recolorRows();
      //updateEmployees();
      return;
    }
  });
}

function recolorRows(){
  $.each(data, function(key, value){
    if(key % 2 == 0){
      $("#row-"+value.id).addClass("dim-background");
    }else{
      $("#row-"+value.id).removeClass("dim-background");
    }
  });
}

function addEmployee(name, lastname, birth, hiredate, gender){
  data.push({
    "id": nextId,
    "birthDate": birth,
    "firstName": name,
    "lastName": lastname,
    "gender": gender,
    "hireDate": hiredate,
  })
  nextId++;
}

function saveModalInputs(){
  addEmployee(
    $("#name").val().trim(),
    $("#lastname").val().trim(),
    $("#birthday").val(),
    $("#hiring-date").val(),
    $("#sex").val()
  );
  updateEmployees();
}

$( window ).on( "load", function() {
  updateEmployees();
})

function emptyModalInputs(){
  $("#name").val("");
  $("#lastname").val("");
  $("#birthday").val("");
  $("#hiring-date").val("");
}