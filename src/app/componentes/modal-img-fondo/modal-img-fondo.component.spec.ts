import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImgFondoComponent } from './modal-img-fondo.component';

describe('ModalImgFondoComponent', () => {
  let component: ModalImgFondoComponent;
  let fixture: ComponentFixture<ModalImgFondoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImgFondoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImgFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
