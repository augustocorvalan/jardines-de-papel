/* globals tracery */
// const INTERVAL_LIMIT = 200;
const INTERVAL_LIMIT = 2000;
const REVERSE = true;
const INTERVAL_TIMING = 750;
// const INTERVAL_TIMING = 1;
const MIN_PHRASE_REPEAT = 17;
const MAX_PHRASE_REPEAT = 28;
const MAZE_CHANCES = 2;
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
    "#opener# #configuration# imaginarias de jardines de papel",
    "#configuration# imaginarias de jardines de papel",

    "#opener# #configuration# y #configuration# y #configuration# de la arquitectura de los jardines de papel",
    "#opener# #configuration# y #configuration# y #configuration# de la arquitectura de los jardines de papel",
    ],
    "seed1": [
    "#feelings# y laberintos en los jardines de papel",
    "#luck# y laberintos en los jardines de papel",
    "#luck# y #luck# y laberintos en los jardines de papel",

    "#feelings# y amor y solitud en los jardines de papel",
    "#luck# y amor y solitud en los jardines de papel",
    "amor y solitud en los jardines de papel",

    "solitud en los jardines de papel",
    "#luck# y solitud en los jardines de papel",

    "amor en los jardines de papel",
    "#luck# y amor en los jardines de papel",
    ],
    "seed3": ["perderse en los jardines de papel", "estar perdido en los jardines de papel", "tiempo en los jardines de papel", "perdiendo tiempo en los jardines de papel"],
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
    "Un #myPlace# de Papel para #accion#",
    "Un #myPlace# de papel para #accion# y #accionSimple#",
    "Un #myPlace# de papel para #accionSimple# y #accionSimple#",
    "Un #myPlace# de papel para #feelings#",
    "Un #myPlace# de papel para #feelings# y #feelings#",
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
const INITIAL_PHRASE = "Un jardín de Papel"

const getRepeatedPhraseText = (text, min=MIN_PHRASE_REPEAT, max=MAX_PHRASE_REPEAT) => {
    return getRepeatedText(text, min, max)
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
    var _isMaze = false;
    var _State = getNewState(INITIAL_PHRASE)

  function getGrammarResult() {
    return _Grammar.flatten("#origin#");
  }
  function displayText(text) {
    const $p = createTextEl(text)
    insertEl($p)
  }
  function displayMazeText(text) {
    const $p = makeMazeText(text)
    insertEl($p)
  }
  function insertEl($el) {
    if (REVERSE) {
        _Container.prepend($el);
    } else {
        _Container.appendChild($el);
    }
  }
  function getNewState(newPhrase) {
    let newState = []
    if (!newPhrase) {
        newPhrase = getGrammarResult()
    }
    const repeatedPhrase = getRepeatedPhraseText(newPhrase)
    const distortedPhrase = repeatedPhrase.map(piece => blankOutPhrase(piece))
    const gardenPhrases = getRepeatedPhraseText(pickArray(BLANK_CHARS))
    .map(piece => blankOutPhrase(piece))
    .join(" ")

    // garden text
    newState = newState.concat(getRepeatedPhraseText(gardenPhrases))
    // distorted phrase text
    newState = newState.concat(distortedPhrase)
    // normal text
    newState = newState.concat(repeatedPhrase)
    return newState
  }

  var intervalId = setInterval(function(){
    var currentPhrase;
    if(_Counter === INTERVAL_LIMIT){
       clearInterval(intervalId);
       return
    }
    if (!_State.length) {
        if (getRandomInt(0, MAZE_CHANCES) === 1) {
            console.log("MAZE TIME")
            _State = getNewMazeState()
            _isMaze = true
        } else {
            _State = getNewState()
            _isMaze = false
        }
    }  

    /* Add phrases */
    currentPhrase = _State.pop()
    if (currentPhrase) {
        if (_isMaze) {
            displayMazeText(currentPhrase)
            // displayText(currentPhrase)
        } else {
            displayText(currentPhrase)
        }
    }

    _Counter++;
  }, INTERVAL_TIMING);
});
