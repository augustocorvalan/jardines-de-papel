const MAZE_REPEAT_MIN = 16 
const MAZE_REPEAT_MAX = 26
const MAZE_PHRASES = [
	"y todos los jardines son, a su manera, laberintos tambien",
	"y todos los jardines son, por supuesto, laberintos tambien"
]

// print out laberinto container
	// div and then absolute position to the current scrollview

// print out laberinto phrases

const makeMazeContainerEl = () => {
	const $div = document.createElement("div")
	$div.className = "maze-container"
	return $div
}
const makeMazeText = (text) => {
	const $p = document.createElement("p")
	$p.className = "maze-phrase"
	$p.innerHTML = text
	return $p
}
const getRepeatedMazeText = () => {
	const text = pickArray(MAZE_PHRASES)
	const repeatedText = getRepeatedText(text, MAZE_REPEAT_MIN, MAZE_REPEAT_MAX)

	return repeatedText
}
const getNewMazeState = () => {
	let state = []
	let newState = getRepeatedMazeText()
	state = state.concat(newState)
	return state
}