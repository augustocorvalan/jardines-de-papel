/* globals tracery */


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

const createTextEl = text => {
    const textPieces = text.split(" ")
    var $div = document.createElement('div');
    $div.className = "phraseContainer"

    textPieces.forEach(piece => {
        var $text = document.createElement('span');
        $text.className = "phrasePiece"
        $text.innerHTML = piece;
        $div.appendChild($text)
    })

    return $div
}

/* BOOK SETTINGS */
const INITIAL_PHRASE = "Un jardín de Plástico"
const INTERVAL_LIMIT = 105;
const INTERVAL_TIMING = 500;
const MIN_PHRASE_REPEAT = 9;
const MAX_PHRASE_REPEAT = 15;
const REVERSE = true
const BLANK_CHARS = [
    " . ",
    ".",
    " ¨ ",
    " ° ",
    "◦",
    "/",
    "/ ",
    " I ",
    "¦",
    "",
    " ",
    ":",
    " Ï ",
    "ï"
]

function getRandomInt(min=0, max=2) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickArray(myArray) {
    return myArray[Math.floor(Math.random()*myArray.length)]
}
const getRepeatedText = (text, min=MIN_PHRASE_REPEAT, max=MAX_PHRASE_REPEAT) => {
    const randomLength = getRandomInt(min, max) 
    return Array(randomLength).fill(text)
} 
const blankOutPhrase = (phrase, replacement) => {
    if (!replacement) {
        replacement = pickArray(BLANK_CHARS)
    }
    return phrase.split(" ").map(piece => {
        var newPiece = piece
        if (getRandomInt()) {
            newPiece = replaceTextWith(piece, replacement)
        }
        return newPiece
    }).join(" ")
}
const replaceTextWith = (text, replacement=" . ") => {
    return Array(text.length).fill(replacement).join("")
}
window.addEventListener("load", () => {
    const _Container = document.getElementById("container");
    const _Grammar = tracery.createGrammar(buildTraceryGrammar());

    var _Counter = 0;
    var _State = getNewState(INITIAL_PHRASE)

  function getGrammarResult() {
    return _Grammar.flatten("#origin#");
  }
  function displayText(text) {
    const $p = createTextEl(text)
    if (REVERSE) {
        _Container.prepend($p);
    } else {
        _Container.appendChild($p);
    }
  }
  function getNewState(newPhrase) {
    let newState = []
    if (!newPhrase) {
        newPhrase = getGrammarResult()
    }
    const repeatedPhrase = getRepeatedText(newPhrase)
    const distortedPhrase = repeatedPhrase.map(piece => blankOutPhrase(piece))

    // distorted phrase text
    newState = newState.concat(distortedPhrase)
    // normal text
    newState = newState.concat(repeatedPhrase)
    // garden text
    return newState
  }

  var intervalId = setInterval(function(){
    var currentPhrase;
     if(_Counter === INTERVAL_LIMIT){
        clearInterval(intervalId);
        return
     }

    if (!_State.length) {
       _State = getNewState()
    }  
    currentPhrase = _State.pop()

     if (currentPhrase) {
         displayText(currentPhrase)
     }

     _Counter++;
  }, INTERVAL_TIMING);
});
