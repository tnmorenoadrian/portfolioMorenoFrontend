import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moments = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-modal-educacion-add',
  templateUrl: './modal-educacion-add.component.html',
  styleUrls: ['./modal-educacion-add.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ModalEducacionAddComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentEducacion:any;
  @Input() fromParentIdPersona:any;

  @Output() datosAdd: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectfile') el!:ElementRef;  
  
  progress = { loaded : 0 , total : 0 };
  uploadedImage!: File;
  selectImage: any;
  successResponse!: string;
  dbImage: any;
  ImgEduPortfolio: any;
  dbImageDuplicada:any;
  dateDesde = new FormControl(moments());
  dateHasta = new FormControl(moments());
  ctrlValueDesde: any;
  ctrlValueHasta: any;


  constructor(
    public activeModal: NgbActiveModal,
    private httpImagen: ImagenesService
    ) { }

  ngOnInit() {
    this.imagePreviaAction();
  }

  setMonthAndYearDesde(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.ctrlValueDesde = this.dateDesde.value!;
    this.ctrlValueDesde.month(normalizedMonthAndYear.month());
    this.ctrlValueDesde.year(normalizedMonthAndYear.year());
    this.dateDesde.setValue(this.ctrlValueDesde);
    datepicker.close();
  }


  setMonthAndYearHasta(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.ctrlValueHasta = this.dateHasta.value!;
    this.ctrlValueHasta.month(normalizedMonthAndYear.month());
    this.ctrlValueHasta.year(normalizedMonthAndYear.year());
    this.dateHasta.setValue(this.ctrlValueHasta);
    datepicker.close();
  }


  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
    const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.selectImage = reader.result;
        reader.readAsDataURL(file);
        this.buscarImagen();
  }

  imagePreviaAction() {  
    this.dbImage = true;
      this.httpImagen.verImagen(this.fromParentEducacion.image_educacion).subscribe(data => {      
        this.createImageFromBlob(data);
        this.dbImage = false;
      }, error => {
        this.dbImage = false;
      });
    }

    createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.ImgEduPortfolio = reader.result;
          
      }, false);

      if (image) {
          reader.readAsDataURL(image);
      }
    }
   
   imageUploadAction() {
    this.httpImagen.subirImagen(this.uploadedImage).subscribe(
      (data: any) => { 
        if(data.type == 1 && data.loaded && data.total){
          this.progress.loaded = data.loaded;
          this.progress.total = data.total;
        }
        else if(data.body){
          this.successResponse=data.body.message;
        }

       },
      error => console.log(error) );
    }

    
    
    buscarImagen() {
      this.httpImagen.buscarImagen(this.uploadedImage.name).subscribe(data => {
        this.dbImageDuplicada=data;
      })
      }

   cambiarImagen() {
    this.fromParentEducacion.image_educacion='https:/yoprogramo-tnmorenoadrian.koyeb.app/get/image/' + this.uploadedImage.name;
    }

    agregar() {
      this.datosAdd.emit(this.fromParentEducacion);
      this.fromParentEducacion.persona= this.fromParentIdPersona;
      this.fromParentEducacion.image_educacion='https://yoprogramo-tnmorenoadrian.koyeb.app/get/image/' + this.uploadedImage.name;
      this.fromParentEducacion.desde_educacion=moments(this.ctrlValueDesde).format('MMM, YYYY');
      this.fromParentEducacion.hasta_educacion=moments(this.ctrlValueHasta).format('MMM, YYYY');
      this.activeModal.close(this.fromParentEducacion);
      }

    cerrar() {
      this.activeModal.close();
      } 

}

function moment(): any {
  throw new Error('Function not implemented.');
}

