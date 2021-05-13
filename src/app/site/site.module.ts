import { CharactersService } from './services/characters.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomeComponent } from './home/home.component';

import { SiteComponent } from './site.component';
import { CharactersSelectedComponent } from './components/characters-selected/characters-selected.component';
import { CharacterFrameComponent } from './components/character-frame/character-frame.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SiteComponent,
    HomeComponent,
    CharactersSelectedComponent,
    CharacterFrameComponent,
    CharacterDetailComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SiteRoutingModule
  ],
  providers: [
    CharactersService
  ]
})
export class SiteModule { }
