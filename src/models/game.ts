export class Game {
    public players: string[]  = [];
    public playerImages: string[] = [];
    public stack: string[]  = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string = '';
allPlayerPics: any;
    //public gameOver: boolean = false;


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
     *  Creates Json with variable which are defined above.
     *  This variables are stored in Firebase.
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
          //gameOver: this.gameOver
      }
  }

}


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
