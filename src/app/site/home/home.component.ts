import { Subscription, Subject } from 'rxjs';
import { CharactersService } from './../services/characters.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: Character[] = [];
  charactersSearchResult: Character[] = [];
  loading = false;
  searchLoaded = false;
  charactersSelected = new Set();
  subscription: Subscription = new Subscription();

  subject: Subject<any> = new Subject();
  searchInputString = '';
  offset = -20;

  constructor(private charactersService: CharactersService) {

  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {

    const pos = (event.target.scrollingElement.scrollTop ||
      event.target.scrollingElement.scrollTop) + event.target.scrollingElement.offsetHeight + .5;
    const max = event.target.scrollingElement.scrollHeight;


    if (!this.loading) {
      // Verifica se scroll esta no final da pagina para efetuar a paginação
      if (pos >= max) {
        this.getCharacters()
      }
    }
  }
  ngOnInit(): void {
    // const data = localStorage.getItem('heros') || '';
    // const chars = JSON.parse(data);


    const selectedCharsData = localStorage.getItem('selectedChars') || '';

    if (selectedCharsData) {

      const selectedChars = JSON.parse(selectedCharsData);
      this.charactersService.setLocalStorage(selectedChars);
    }
    // this.charactersService.addAll(chars.data.results);

    this.subscription.add(
      this.charactersService.getSelected.subscribe(data => {

        // Limpa o Set de Personagens Selecionados
        this.charactersSelected.clear();

        data.map(e => {
          this.charactersSelected.add(e.id);
        });
      })
    );

    this.subscription.add(
      this.charactersService.getLoaded.subscribe(
        data => {
          this.characters = data;
        }
      )
    );

    this.getCharacters();
  }
  ngAfterViewInit(): void {
    // Aguarda O usuario digitar por 2 segundos
    this.subject.pipe(debounceTime(2000))
      .subscribe(stringInput => {
        this.searchNameStartsWith(stringInput);
      });
  }
  searchInput(event: any): void {
    this.subject.next(event)
  }
  getCharacters() {
    this.loading = true;
    this.offset += 20;
    this.charactersService.getCharacters((this.offset).toString()).subscribe(
      data => {

        this.loading = false;
        this.charactersService.addAll(data.data.results);
      },
      error => {
        setTimeout(() => {
          this.loading = false;
        }, 3000);

      }
    );
  }
  searchNameStartsWith(name: string) {

    this.charactersService.searchNameStartsWith(name).subscribe(
      data => {
        this.charactersSearchResult = data.data.results;
        this.searchLoaded = true;

      },
      error => {
        this.searchLoaded = true;
      }
    )
  }
  verifySelected(character: Character): boolean {

    return this.charactersSelected.has(character.id);
  }
}
