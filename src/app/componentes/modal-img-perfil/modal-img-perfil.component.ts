import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

@Component({
  selector: 'app-modal-img-perfil',
  templateUrl: './modal-img-perfil.component.html',
  styleUrls: ['./modal-img-perfil.component.css']
})
export class ModalImgPerfilComponent implements OnInit {
  
  @Input() fromParentTitle:any;
  @Input() fromParentPersona:any;

  uploadedImage!: File;
  selectImage: any;
  postResponse: any;
  successResponse!: string;
  errorMsg!:string;
  dbImage: any;
  ImgPerfilPortfolio: any;
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
        console.log(this.uploadedImage)
        this.buscarImagen();
  }

   imagePreviaAction() {
    this.dbImage = true;
      this.httpImagen.verImagen(this.fromParentPersona.image_perfil).subscribe(data => {
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
          this.ImgPerfilPortfolio = reader.result;
      }, false);

      if (image) {
          reader.readAsDataURL(image);
      }
    }
   
   imageUploadAction() {
    this.httpImagen.subirImagen(this.uploadedImage).subscribe(
      response => {
      if (response.status === 200) {
        this.postResponse = response;
        this.successResponse = this.postResponse.body.message;
      }
    }, (error)=>{
      if (error.status === 500) {
            this.errorMsg="Error 500- Pruebe cambiar el nombre del archivo";
      }
      else if (error.status === 404) {
        this.errorMsg="Error 404- Problema con servidor backend";
     }

    });
    }

    buscarImagen() {
      this.httpImagen.buscarImagen(this.uploadedImage.name).subscribe(data => {
        console.log(data);
        this.dbImageDuplicada=data;
      })
      }
    
   cambiarImagen() {
    this.fromParentPersona.image_perfil='http://localhost:8081/get/image/' + this.uploadedImage.name;
    this.activeModal.close(this.fromParentPersona);
    }

    cerrar() {
      this.activeModal.close();
      } 
 
}
