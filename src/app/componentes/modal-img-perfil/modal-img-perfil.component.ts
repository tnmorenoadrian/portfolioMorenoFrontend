import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
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
  //image: any;

  constructor(
    private httpClient: HttpClient, 
    public activeModal: NgbActiveModal,
    private subirImagen: ImagenesService
    ) { }

  ngOnInit() {
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
    const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.selectImage = reader.result;
        reader.readAsDataURL(file);
  }

/*
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8081/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status == 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Ah ocurrido un error en subir la imagen!';
        }
      }
      );
    }
  
  verImagen() {
    this.httpClient.get('http://localhost:8081/get/image/info/' + this.uploadedImage.name)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          //this.fromParentPersona.image_perfil = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
    //this.fromParentPersona.image_perfil='http://localhost:8081/get/image/' + this.uploadedImage.name;
   }
   */
   
   imageUploadAction() {
    this.subirImagen.subirImagen(this.uploadedImage).subscribe(
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
    
   cambiarImagen() {
    this.fromParentPersona.image_perfil='http://localhost:8081/get/image/' + this.uploadedImage.name;
    this.activeModal.close(this.fromParentPersona);
    }

    cerrar() {
      this.activeModal.close();
      } 
 
}
