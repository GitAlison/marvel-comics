import { Character } from 'src/app/interfaces/character';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  charactersSelected = new Set();
  character: Character | undefined;
  subscription: Subscription = new Subscription();

  characterId!: string;
  loading = false;
  error = '';
  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,

  ) { }

  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id') || '';

    this.character = this.charactersService.getOneCharacter(parseInt(this.characterId));
    if (!this.character) {
      // Busca no servidor caso ainda não tenha listado na pagina principal
      this.loading = true;
      this.subscription.add(
        this.charactersService.getCharacterServer(this.characterId).subscribe(
          data => {
            this.character = data.data.results[0];
            this.loading = false;
            this.error = '';
          },
          eror => {
            this.loading = false;
            this.error = 'Não encontrado tente novamente';
          }
        )
      )
    }
    this.subscription.add(
      this.charactersService.getSelected.subscribe(data => {

        // Limpa o Set de Personagens Selecionados
        this.charactersSelected.clear();
        data.map(e => {
          this.charactersSelected.add(e.id);
        })
      })
    )
  }
  verifySelected(): boolean {

    return this.charactersSelected.has(parseInt(this.characterId));
  }
  selectCharacter(): void {
    // Seleciona ou Desseleciona o Personagem
    if (this.character)
      this.charactersService.selectCharacter(this.character);

  }

}
