import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  playerImages = [  "player1.png",  "player2.png",  "player3.png",  "player4.png"];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}
}
