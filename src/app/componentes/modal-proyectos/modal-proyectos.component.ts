import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { FormControl } from '@angular/forms';

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
  selector: 'app-modal-proyectos',
  templateUrl: './modal-proyectos.component.html',
  styleUrls: ['./modal-proyectos.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ModalProyectosComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentProyecto:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectfile') el!:ElementRef; 
  
  progress = { loaded : 0 , total : 0 };
  uploadedImage!: File;
  selectImage: any;
  successResponse!: string;
  dbImage: any;
  ImgProyPortfolio: any;
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
      this.httpImagen.verImagen(this.fromParentProyecto.image_proyecto).subscribe(data => {      
        this.createImageFromBlob(data);
        this.dbImage = false;
      }, error => {
        this.dbImage = false;
        
      });
    }

    createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.ImgProyPortfolio = reader.result;
          
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
    this.fromParentProyecto.image_proyecto='http://localhost:8081/get/image/' + this.uploadedImage.name;
    }

    actualizar() {
      this.datosEdit.emit(this.fromParentProyecto);
      this.fromParentProyecto.desde_proyecto=moments(this.ctrlValueDesde).format('MMM, YYYY');
      this.fromParentProyecto.hasta_proyecto=moments(this.ctrlValueHasta).format('MMM, YYYY');
      if(this.uploadedImage!==undefined){
        this.cambiarImagen()
      }
      this.activeModal.close(this.fromParentProyecto);
      }

    cerrar() {
      this.activeModal.close();
      } 

}

function moment(): any {
  throw new Error('Function not implemented.');
}
