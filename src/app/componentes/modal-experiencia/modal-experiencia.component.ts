import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

@Component({
  selector: 'app-modal-experiencia',
  templateUrl: './modal-experiencia.component.html',
  styleUrls: ['./modal-experiencia.component.css']
})
export class ModalExperienciaComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentExperiencia:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectfile') el!:ElementRef;   //in html we make variable of selectfile
  
  progress = { loaded : 0 , total : 0 };
  uploadedImage!: File;
  selectImage: any;
  successResponse!: string;
  dbImage: any;
  ImgExpPortfolio: any;
  dbImageDuplicada:any;

  constructor(
    public activeModal: NgbActiveModal,
    private httpImagen: ImagenesService
    ) { }

  ngOnInit() {
    this.imagePreviaAction();
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
      this.httpImagen.verImagen(this.fromParentExperiencia.image_experiencia).subscribe(data => {      
        this.createImageFromBlob(data);
        this.dbImage = false;
      }, error => {
        this.dbImage = false;
        console.log(error);
      });
    }

    createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.ImgExpPortfolio = reader.result;
          
      }, false);

      if (image) {
          reader.readAsDataURL(image);
      }
    }
   
   imageUploadAction() {
    this.httpImagen.subirImagen(this.uploadedImage).subscribe(
      (data: any) => { 
        console.log(data);
        if(data.type == 1 && data.loaded && data.total){
          console.log("gaju");
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
    this.fromParentExperiencia.image_experiencia='http://localhost:8081/get/image/' + this.uploadedImage.name;
    }

    actualizar() {
      this.datosEdit.emit(this.fromParentExperiencia);
      this.fromParentExperiencia.image_experiencia='http://localhost:8081/get/image/' + this.uploadedImage.name; 
      this.activeModal.close(this.fromParentExperiencia);
      }

    cerrar() {
      this.activeModal.close();
      } 

}
