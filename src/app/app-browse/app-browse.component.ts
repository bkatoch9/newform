
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';



import {MatDialog} from '@angular/material/dialog';
//import { Component } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './app-browse.component.html',
  styleUrls: ['./app-browse.component.css']
})
export class AppBrowseComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AppBrowsedComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-browsed',
  templateUrl: './app-browsed.component.html',
  styleUrls: ['./app-browse.component.css']
  
})
export class AppBrowsedComponent implements OnInit { 
  @Input() text = 'Browse';
      @Input() param = 'file';
      @Input() target = 'https://file.io';
      @Input() accept = '.xlsx';
      @Output() complete = new EventEmitter<string>();

      public files: Array<FileUploadModel> = [];
      
      constructor(public _http: HttpClient) { }

      ngOnInit() {
      }

      onClick() {
            
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            
            fileUpload.onchange = () => {
                  if(fileUpload.files.length !==1) throw new Error('Cannot upload multiple files');
                  for (let index = 0; index < fileUpload.files.length; index++) {
                        const file = fileUpload.files[index];
                        this.files.push({ data: file, state: 'in', 
                          inProgress: false, progress: 0, canRetry: false, canCancel: true });
                          //console.log("hello");
                  }
                  
                  this.uploadFiles();
                  
            };
            fileUpload.click();
            
      }

      onFileComplete() {
        console.log(`Successful upload`);
      }
      public uploadFile(file: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, file.data);

            const req = new HttpRequest('POST', this.target, fd, {
                  reportProgress: true
            });

            file.inProgress = true;
            file.sub = this._http.request(req).pipe(
                  map(event => {
                        switch ((<any>event).type) {
                              case HttpEventType.UploadProgress:
                                    file.progress = Math.round((<any>event).loaded * 100 / (<any>event).total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  // tap(message => { }),
                  // last(),
                  catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        return of(`${file.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object' && this.files.length !== 1) {
                              this.removeFileFromArray(file);
                              this.complete.emit(event.body);
                        }
                  }
            );
      }

      private uploadFiles() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.value = '';

            this.files.forEach(file => {
                  this.uploadFile(file);
            });
      }

      private removeFileFromArray(file: FileUploadModel) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                  this.files.splice(index, 1);
            }
      }

}
export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}


