import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/shared/services/photo.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Subject } from 'rxjs';

@Component({
selector: 'app-form-upload-view',
templateUrl: './viewPhoto.component.html',
styleUrls: []
})
export class ViewFormUploadComponent implements OnInit {

  selectedFiles: FileList;
  photos: any[] = [];
  private FOLDER = 'images';
  f = new Subject();
  d = new Subject();

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.f.asObservable().subscribe(x => this.createphotos(x));
    this.d.asObservable().subscribe(x => this.setArrayBites(x));
    this.getFiles();

    //this.createphotos(this.uploadService.getFiles());
  }

  createphotos(data){
    let photo;
    data.forEach((element, i) => {
      photo = { }
      photo.key = element.Key;
      photo.eTag = element.ETag;
      //this.getOneFile(element.Key, photo);
      this.photos.push(photo);
      //console.log(this.photos)
      this.getFile(photo.key);
    });
  }
  setArrayBites(data){
    const f =  'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(data.Body)))
    const d = new TextDecoder('utf-8').decode(data.Body);
    this.photos.find(x => x.eTag == data.ETag)['bites'] = f;
    console.log(this.photos);
  }

  getFiles() {
    const that = this;
    const bucket = new S3(
      {
        accessKeyId: 'AKIAQYZJSVCSISEKAFOF',
        secretAccessKey: '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',
        region: 'us-east-1'
      });
      const params = { Bucket: 'imagen-promoon' }
      bucket.listObjects(params, function (err: any, data: any) {
      if (err) {
        //console.log('There was an error getting your files: ' + err);
        return;
      }
      that.f.next(data.Contents);
      /*fileDatas.forEach(function (file) {
        console.log(file)
      });*/
  });
}
  getFile(key) {
    const that = this;
    const bucket = new S3({
      accessKeyId: 'AKIAQYZJSVCSISEKAFOF',
      secretAccessKey: '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',
      region: 'us-east-1'
    });
    const params = { Bucket: 'imagen-promoon', Key: key }

    bucket.getObject(params, function (err: any, data: any) {
      if (err) {
        //console.log('There was an error getting your files: ' + err);
        return;
      }
      const d = new TextDecoder('utf-8').decode(data.Body);
      that.d.next(data);
    });
  }
}
