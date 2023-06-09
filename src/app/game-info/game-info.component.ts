import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})

/**
 * Shows the rules of the game.
 * Each card has a new rule.
 */
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Everytime the thumb master puts his/her thumb on the floor, everyone has to do the same. The last to do so has to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'If someone answers a question the quiz master asks, they must drink, but if they respond with the name of a song title, the quiz master has to drink' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title = '';
  description = '';
  @Input() card!: string;


  /**
   * Updates the 'title' and 'description' properties of the component based on the current 'card' input.
   * Method is called whenever the input properties of the component change, ...
   * ... allowing the component to update its state based on changes to external data.
   */
  ngOnChanges(): void {
    if (this.card) {
      // console.log('current Card is: ', this.card);
      // console.log('current Number is: ', this.card.split('_')[1]);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
