import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;
  currentPlayer: any;
  itemCollection: any;
  games$: Observable<Game[]> | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // get a reference to the games-profile collection
    const gamesCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gamesCollection) as Observable<Game[]>;
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
    
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
