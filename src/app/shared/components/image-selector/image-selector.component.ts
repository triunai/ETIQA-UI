import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileImageModel } from '../models/profile-image.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImageSelectorService } from './image-selector.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  model: ProfileImageModel = {
    title: '',
    fileName: '',
    fileExtension: '',
    fileUrl: '',
  }

  images$?: Observable<ProfileImageModel[]>; // ensure its an array because this is gonna hold the fetch/getAl data

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageSelectorService){

  }
  ngOnInit(): void {
    this.fetchImages();
  }
  onFileUploadChange(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]; // or use if(element.files?)
  }

  uploadImage(){
    if(this.file && this.model &&this.model.title !=='' && this.model.fileName !==''){
      // image service to upload an image
      this.imageService.uploadImage(this.file, this.model.fileName, this.model.title).subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.fetchImages();
        },
        error: (error) => {
          console.error("yeah upload isnt working!"+this.model.title, error);
        }
      })
  }else {
    console.log("yeah we didnt hit the main if!")
  }
}

  selectImage(image: ProfileImageModel): void {
    this.imageService.selectImage(image);
  }

  private fetchImages(){
    this.images$ = this.imageService.getAllImages();
  }
}
