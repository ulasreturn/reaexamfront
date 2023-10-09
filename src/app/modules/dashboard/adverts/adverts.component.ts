import { Component } from '@angular/core';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent {
  selectedFiles: File[] = [];

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
  }

  deleteFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
