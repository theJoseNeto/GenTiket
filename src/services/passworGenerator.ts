const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // 10
const smallLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] // 26
const capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // 26
const sym = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "+", "=", "_", "<", ">", ":", ";", "[", "]", "{", "}", "?", "/", "~"] // 24

// min = 0
// max = array.length

class PassGen {
    passwordGen = (
        min = 0,
        character = Array(numbers, smallLetters, capitalLetters, sym),
        max = character.length,
    ) => {

        let pass = Array();
        const random =
            max = Math.floor(max);

        while (pass.length < 100) {
            pass.push(character[Math.floor(Math.random() * (max - min)) + min][Math.floor(Math.random() * (max - min)) + min]);
        }

        const finalPass = this.shufflePass(pass);
        return finalPass
    }


    shufflePass = (array:any) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        const finalPass = array.join('')
        return finalPass;
    }



}
export {PassGen};