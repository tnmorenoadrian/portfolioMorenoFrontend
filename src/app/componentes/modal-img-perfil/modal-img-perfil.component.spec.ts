import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImgPerfilComponent } from './modal-img-perfil.component';

describe('ModalImgPerfilComponent', () => {
  let component: ModalImgPerfilComponent;
  let fixture: ComponentFixture<ModalImgPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImgPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImgPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
