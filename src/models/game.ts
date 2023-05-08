export class Game {
    public players: string[]  = [];
    public playerImages: string[] = [];
    public stack: string[]  = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string = '';

    constructor() {
        for(let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    /***
     *  Returns a JSON object that represents the state of the 'Game' object.
     *  JSON object includes all of the properties of the 'Game'.
     *  Used to convert the 'Game' object to a format that can be stored in a Firestore document.
     */
    public toJson() {
      return {
          players: this.players,
          playerImages: this.playerImages,
          stack: this.stack,
          playedCards: this.playedCards,
          currentPlayer: this.currentPlayer,
          pickCardAnimation: this.pickCardAnimation,
          currentCard: this.currentCard,
      }
  }
}

/**
 * Shuffles the input array in place using the Fisher-Yates shuffle algorithm, ...
 * ... which randomly swaps elements in the array to achieve a random ordering.
 * The shuffled 'array' is returned as the output of the function.
 * @param array
 * @returns
 */
function shuffle(array: string[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle.
    while (0 != currentIndex) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
      // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array [randomIndex];
    array [randomIndex] = temporaryValue;
    }
    return array;
}
