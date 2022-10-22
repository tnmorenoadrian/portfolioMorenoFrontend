import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-modal-img-perfil',
  templateUrl: './modal-img-perfil.component.html',
  styleUrls: ['./modal-img-perfil.component.css']
})
export class ModalImgPerfilComponent implements OnInit {
  
  @Input() fromParentTitle:any;
  @Input() fromParentPersona:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();

  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;

  constructor(
    private httpClient: HttpClient, 
    public activeModal: NgbActiveModal,
    private datosPortfolio:PortfolioService 
    ) { }

  ngOnInit() {
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8081/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Ah ocurrido un error en subir la imagen!';
        }
      }
      );
    }

  viewImage() {
    this.httpClient.get('http://localhost:8081/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
   }

   actualizar() {
    this.datosEdit.emit(this.fromParentPersona); 
    this.activeModal.close(this.fromParentPersona);
    }
 
}
