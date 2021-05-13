import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFrameComponent } from './character-frame.component';

describe('CharacterFrameComponent', () => {
  let component: CharacterFrameComponent;
  let fixture: ComponentFixture<CharacterFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
