import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;
  currentPlayer: any;

  games$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  games!: Array<any>;
  todotext:string = '';

  constructor(public dialog: MatDialog) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection);

    this.games$.subscribe(( game ) => {
      this.games = game;
      console.log('Game update', game);
    });
  }

  ngOnInit(): void {
    // get a reference to the games-profile collection
    const gamesCollection = collection(this.firestore, 'games');

    this.games$ = collectionData(gamesCollection) as Observable<Game[]>;
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);

    // Add the new game to Firestore
    // setDoc replaces the .add()
    const gamesCollection = collection(this.firestore, 'games');
    setDoc(doc(gamesCollection), {name: "hallo Welt TEST 123"});
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

  editPlayer() {

  }

}
function addDoc(gamesCollection: CollectionReference<DocumentData>, game: Game) {
  throw new Error('Function not implemented.');
}

