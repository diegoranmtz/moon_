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
    if(event.target.files[0].size > 60000)
      return alert ('El archivo pesa ' + event.target.files[0].size/1024 + ' MB, debe pesar menos de ' + 60000/1024 + 'MB');
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
  }
}
