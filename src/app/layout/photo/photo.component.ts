import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/shared/services/photo.service';

@Component({
selector: 'app-form-upload',
templateUrl: './photo.component.html',
styleUrls: []
})
export class FormUploadComponent implements OnInit {

selectedFiles: FileList;

constructor(private uploadService: UploadFileService) { }

ngOnInit() {

}

upload() {
  const file = this.selectedFiles.item(0);
  this.uploadService.uploadFile(file);
}
getFiles(){
  this.uploadService.getFiles();
}
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
