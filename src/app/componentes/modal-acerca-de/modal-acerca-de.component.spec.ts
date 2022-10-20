import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcercaDeComponent } from './modal-acerca-de.component';

describe('ModalAcercaDeComponent', () => {
  let component: ModalAcercaDeComponent;
  let fixture: ComponentFixture<ModalAcercaDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAcercaDeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAcercaDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
