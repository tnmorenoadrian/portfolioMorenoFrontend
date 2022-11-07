import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEducacionAddComponent } from './modal-educacion-add.component';

describe('ModalEducacionAddComponent', () => {
  let component: ModalEducacionAddComponent;
  let fixture: ComponentFixture<ModalEducacionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEducacionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEducacionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
