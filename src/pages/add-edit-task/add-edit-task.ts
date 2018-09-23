import { Component, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-edit-task',
  templateUrl: 'add-edit-task.html',
})
export class AddEditTaskPage {

  @ViewChild('fileInput') fileInput;

  title: string;
  photo: string;

  constructor(public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private camera: Camera) {
    this.title = (navParams.get('action') == 'edit') ? 'Editar tarefa' : 'Criar tarefa';
  }

  attachPhoto() {
    if (!Camera['installed']()) {
      this.fileInput.nativeElement.click();
      return false;
    }

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Tirar foto',
          handler: () => {
            this.cameraOrLibraryPhoto(this.camera.PictureSourceType.CAMERA, this.camera.MediaType.PICTURE);
          }
        },{
          text: 'Buscar na galeria',
          handler: () => {
            this.cameraOrLibraryPhoto(this.camera.PictureSourceType.PHOTOLIBRARY, this.camera.MediaType.PICTURE);
          }
        },{
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.photo =  imageData;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  cameraOrLibraryPhoto(source: number = 1, mediaType: number = 0) {
    const options: CameraOptions = {
      quality: 100,
      mediaType: mediaType,
      sourceType: source,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG
    };

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    });
  }
}
