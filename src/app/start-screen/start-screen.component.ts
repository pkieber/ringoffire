import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {

  }

  newGame() {
    // start game
    let game = new Game;
    let gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
