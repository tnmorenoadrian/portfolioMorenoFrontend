import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExperienciaAddComponent } from './modal-experiencia-add.component';

describe('ModalExperienciaAddComponent', () => {
  let component: ModalExperienciaAddComponent;
  let fixture: ComponentFixture<ModalExperienciaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExperienciaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExperienciaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
