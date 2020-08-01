import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private FOLDER = 'images';
  constructor(private router: Router) { }

  uploadFile(file) {
    const that = this;
      const contentType = file.type;
      const bucket = new S3(
            {
              accessKeyId: 'AKIAQYZJSVCSISEKAFOF',
              secretAccessKey: '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',
              region: 'us-east-1'
            }
        );
        const params = {
            Bucket: 'imagen-promoon',
            Key: this.FOLDER + file.name,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            alert('Foto guardada con éxito');
            that.router.navigate(['app', 'showDocument']);
            console.log('Successfully uploaded file.', data);
            return true;
        });
      }
      getFiles() {
        const bucket = new S3(
              {
                  accessKeyId: 'AKIAQYZJSVCSISEKAFOF',
                  secretAccessKey: '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',
                  region: 'us-east-1'
              }
          );
    const params = {
      Bucket: 'imagen-promoon'
    }

    return bucket.listObjects(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      data.Contents;

      /*fileDatas.forEach(function (file) {
        console.log(file)
      });*/
    });
  }
  getFile(key) {
    const bucket = new S3({
      accessKeyId: 'AKIAQYZJSVCSISEKAFOF',
      secretAccessKey: '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',
      region: 'us-east-1'
    });
    const params = { Bucket: 'imagen-promoon', Key: key }

    return bucket.getObject(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
      const d = new TextDecoder('utf-8').decode(data.Body);
      return d
    });
  }
}
