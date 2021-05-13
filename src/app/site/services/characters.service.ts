import { Character } from '../../interfaces/character';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {


  private _charactersListSelected = new BehaviorSubject<Character[]>([]);
  private _charactersListLoaded = new BehaviorSubject<Character[]>([]);

  private _charactersListLocal: Character[] = [];
  private _localCharacters: Character[] = [];

  constructor(private http: HttpClient) { }

  get getSelected(): Observable<Character[]> {
    return this._charactersListSelected.asObservable();
  }

  get getLoaded(): Observable<Character[]> {
    return this._charactersListLoaded.asObservable();
  }

  getOneCharacter(id: number): Character | undefined {
    let obj;
    this.getLoaded.pipe(take(1), map(obj => {
      let object = obj.find(o => o.id == id);
      return object;

    })).subscribe(
      data => {
        obj = data;
      }
    );

    return obj;

  }

  selectCharacter(character: Character): void {

    const indexCharacter = this._localCharacters.findIndex(c => c.id == character.id)

    // Verifica A existencia o item selecionado
    if (indexCharacter < 0) {
      // Verifica A existencia de 5 Itens Na lista
      if (this._localCharacters.length < 5) {
        this._localCharacters.push(character);
      }
    } else {
      // Armazena os personagens em localStorage pra proxima sessão
      this._localCharacters.splice(indexCharacter, 1);
    }

    // Armazena os personagens em localStorage pra proxima sessão
    localStorage.setItem('selectedChars', JSON.stringify(this._localCharacters));
    // Envia a lista atualiada para o observavel
    this._charactersListSelected.next(this._localCharacters);
  }
  setLocalStorage(characters: Character[]): void {
    this._localCharacters = characters;
    this._charactersListSelected.next(characters);
  }
  addAll(characters: Character[]): void {

    this._charactersListLocal.push(...characters);
    this._charactersListLoaded.next(this._charactersListLocal);
  }
  getCharacters(offset: string): Observable<any> {
    let params = new HttpParams().set('offset', offset);

    return this.http.get<any>(`characters`, { params });
  }
  getCharacterServer(id: string): Observable<any> {
    return this.http.get<any>(`characters/${id}`);
  }
  searchNameStartsWith(nameStartsWith: string): Observable<any> {
    let params = new HttpParams().set('nameStartsWith', nameStartsWith);

    return this.http.get<any>(`characters`, { params });
  }
}
