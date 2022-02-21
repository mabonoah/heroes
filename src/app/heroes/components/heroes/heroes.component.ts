import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../heroes.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [
    trigger('flyIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)' }),
        animate(600)
      ])
    ])
  ]
})
export class HeroesComponent implements OnInit {

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void {
  }

}
