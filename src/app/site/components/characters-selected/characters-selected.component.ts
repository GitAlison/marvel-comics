import { Character } from 'src/app/interfaces/character';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CharactersService } from '../../services/characters.service';


@Component({
  selector: 'app-characters-selected',
  templateUrl: './characters-selected.component.html',
  styleUrls: ['./characters-selected.component.scss']
})
export class CharactersSelectedComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  characters2: Character[] = [];
  subscription: Subscription = new Subscription();
  openedCover = false;
  constructor(private charatersServices: CharactersService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.charatersServices.getSelected.subscribe(
        data => {
          this.characters = data;
        }
      )
    );
  }

  removeCharacter(id: number): void {
    this.charatersServices.selectCharacter(Object.assign({ id }));
  }

  toggleCover(): void {
    this.openedCover = !this.openedCover;
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

}
