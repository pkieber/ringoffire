import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

/**
 * Defines three input properties that can be set from a parent component or template.
 */
export class PlayerComponent {
  @Input() name!: string;
  @Input() playerActive: boolean = false;
  @Input() image: string = 'player1.png';
}
