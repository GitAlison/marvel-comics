import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersSelectedComponent } from './characters-selected.component';

describe('CharactersSelectedComponent', () => {
  let component: CharactersSelectedComponent;
  let fixture: ComponentFixture<CharactersSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
