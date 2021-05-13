import { CharactersService } from './../../services/characters.service';

import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character';




@Component({
  selector: 'app-character-frame',
  templateUrl: './character-frame.component.html',
  styleUrls: ['./character-frame.component.scss']
})
export class CharacterFrameComponent implements OnInit {

  @Input() character!: Character;
  @Input()selected = false;
  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
  }
  selectCharacter(): void {

    // Seleciona o Personagem ou desseleciona
    this.characterService.selectCharacter(this.character);

    // this.selected = !this.selected;
  }


}
