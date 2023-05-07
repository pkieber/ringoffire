import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, getDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  game!: Game;
  gameOver = false;
  gameStart = false;
  currentPlayer: any;
  firestore: Firestore = inject(Firestore);
  games$!: Observable<any>;
  games!: Array<any>;
  gameCollection: any;
  gameId!: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // get a reference to the games-profile collection
    this.gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(this.gameCollection);
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId= params['id'];
      this.games$.subscribe( () => {
        this.getCorrectDocument();
      })
    })
  }


  /**
   * Games are shown based on their individual ID.
   */
  async getCorrectDocument() {
    let docRef = doc(this.firestore, "games" ,this.gameId);
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    this.updateServerData(data);
  }


  /**
   * Firebase data will be updated.
   * @param data
   */
  updateServerData(data: any) {
    this.game.players = data['players'];
    this.game.playerImages = data['playerImages'];
    this.game.stack = data['stack'];
    this.game.playedCards = data['playedCards'];
    this.game.currentPlayer = data['currentPlayer'];
    this.game.pickCardAnimation = data['pickCardAnimation'];
    this.game.currentCard = data['currentCard'];
  }


  /**
   * Saves the game.
   */
  saveGame() {
    let docRef = doc(this.firestore, "games", this.gameId);
    updateDoc(docRef, this.game.toJson());
  }


  /**
   * Starts new game.
   */
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  /**
   * Processes all card animations (show card, remove card from stack, change player after picking card)
   * Variables are defined in game.ts and changes are saved to Firebase.
   * If all cards are played, game is over.
   */
  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
      this.game.players = [];
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() as string;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  /**
   * Opens a dialog to edit player img.
   * @param i
   */
  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1); // deletes player
          this.game.playerImages.splice(playerId, 1); // deletes image
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }


  /**
   * Opens a dialog window to add new player.
   * Default pic will be added.
   * Player will be saved after closing the window.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages!.push('player1.png');
        if (this.game.players.length > 1) { // Add minimum 1 player to start game.
          this.gameStart = true;
        }
        this.saveGame(); // Newly added player will be saved.
      }
    });
  }
}
