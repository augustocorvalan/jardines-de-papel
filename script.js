/* globals tracery */



function shuffleArray(array, rnFn) {
    rnFn = rnFn || Math.random;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rnFn() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectVars(vars, n) {
    n = n || vars.length;
    const newVars = vars.slice(0);
    shuffleArray(newVars);
    return newVars.slice(0,3);
}

function buildTraceryGrammar() {
  // const story = {
  //   origin: ["there is #var1# within #var2#"]
  // };


  const story = {
    "luck": [
    "de la oportunidad", "de la casualidad",  "de la posibilidad", "de la suerte", "del riesgo", "de la repetición", "de la paradoja", "de la contradicción", "de la inverosímilitud", "de la absurdidad", "del contrasentido", "de la imaginación"
    ],
    "feelings": ["amor", "solitud", "soledad", "nomadismo", "conflicto", "esperanza"],
    "opener":
    ["un plan para", "un estudio de", "posible", "planes para"],
    "configuration": ["configuraciónes", "alternaciónes", "negaciónes"],
    "seed2": [
    "#opener# #configuration# imaginarias de jardines de plastico",
    "#configuration# imaginarias de jardines de plastico",

    "#opener# #configuration# y #configuration# y #configuration# de la arquitectura de los jardines de plastico",
    "#opener# #configuration# y #configuration# y #configuration# de la arquitectura de los jardines de plastico",
    ],
    "seed1": [
    "#feelings# y laberintos en los jardines de plastico",
    "#luck# y laberintos en los jardines de plastico",
    "#luck# y #luck# y laberintos en los jardines de plastico",

    "#feelings# y amor y solitud en los jardines de plastico",
    "#luck# y amor y solitud en los jardines de plastico",
    "amor y solitud en los jardines de plastico",

    "solitud en los jardines de plastico",
    "#luck# y solitud en los jardines de plastico",

    "amor en los jardines de plastico",
    "#luck# y amor en los jardines de plastico",
    ],
    "seed3": ["perderse en los jardines de plastico", "estar perdido en los jardines de plastico", "tiempo en los jardines de plastico", "perdiendo tiempo en los jardines de plastico"],
    "accionSimple": [
    "perderse",
    ],
    "accionComplex": [
    "pensar",
    "olvidarse"
    ],
    "history": [
    "de la historia",
    "de las memorias",
    ],
    "accion": [
    "#accionSimple#",
    "#accionComplex# #history#",
    "#accionComplex# #luck#"

    ],
    "generate": [
    "Un #myPlace# de Plástico para #accion#",
    "Un #myPlace# de Plástico para #accion# y #accionSimple#",
    "Un #myPlace# de Plástico para #accionSimple# y #accionSimple#",
    "Un #myPlace# de Plástico para #feelings#",
    "Un #myPlace# de Plástico para #feelings# y #feelings#",
    ],
    "origin": [
    "#[myPlace:jardín]generate#",
    "#[myPlace:laberinto]generate#",
    ]
  }
  
  return story;
}


window.addEventListener("load", () => {
  
  

  function getRolls(n = 40) {
    var grammar = tracery.createGrammar(buildTraceryGrammar());
    var rolls = [];
    for (var i=0; i<n;i++) {
      var result = grammar.flatten("#origin#");
      rolls.push(result);
    }
    var uniqRolls = [...new Set(rolls)];
    return uniqRolls;
  }
  function displayRolls() {
    var result = document.getElementById("container");
    var rolls = getRolls();
    rolls.forEach(roll => {
      var p = document.createElement('p');
      p.innerHTML = roll;
      result.appendChild(p);
    });
  }

  displayRolls(); //this outputs the first story
  document.getElementById("reroll").addEventListener("click", function() {
    displayRolls()
  });
});
