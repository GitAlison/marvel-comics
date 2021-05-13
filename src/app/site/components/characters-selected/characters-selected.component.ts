import { Character } from 'src/app/interfaces/character';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CharactersService } from '../../services/characters.service';


@Component({
  selector: 'app-characters-selected',
  templateUrl: './characters-selected.component.html',
  styleUrls: ['./characters-selected.component.scss']
})
export class CharactersSelectedComponent implements OnInit {

  characters: Character[] = [];
  characters2: Character[] = [];
  subscription: Subscription = new Subscription();
  constructor(private charatersServices: CharactersService) { }

  ngOnInit(): void {


    this.subscription.add(
      this.charatersServices.getSelected.subscribe(
        data => {
          this.characters = data;
        }
      )
    )
  }

  removeCharacter(id: number) {
    this.charatersServices.selectCharacter(Object.assign({ id: id }));
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

}
