function getRandomInt(min=0, max=2) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickArray(myArray) {
    return myArray[Math.floor(Math.random()*myArray.length)]
}
const getRepeatedText = (text, min, max) => {
    const randomLength = getRandomInt(min, max) 
    return Array(randomLength).fill(text)
}
