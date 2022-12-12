import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHabilidadAddComponent } from './modal-habilidad-add.component';

describe('ModalHabilidadAddComponent', () => {
  let component: ModalHabilidadAddComponent;
  let fixture: ComponentFixture<ModalHabilidadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHabilidadAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHabilidadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
