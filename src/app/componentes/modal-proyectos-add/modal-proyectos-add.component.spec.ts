import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProyectosAddComponent } from './modal-proyectos-add.component';

describe('ModalProyectosAddComponent', () => {
  let component: ModalProyectosAddComponent;
  let fixture: ComponentFixture<ModalProyectosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProyectosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProyectosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
