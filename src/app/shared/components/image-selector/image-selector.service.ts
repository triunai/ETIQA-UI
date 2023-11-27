import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ProfileImageModel } from '../models/profile-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageSelectorService {

  // to trigger or emit multiple values of an observable, and subscribers who  have subscribed will receive the values of these observables
  selectedImage: BehaviorSubject<ProfileImageModel> = new BehaviorSubject<ProfileImageModel>({
    id: '',
    title : '',
    fileExtension : '',
    fileName : '',
    fileUrl : '',
  });

  constructor(private http: HttpClient) { }

  // Upload image
  // Ensure key name matches API params and args
  uploadImage(file: File, fileName: string, title: string):Observable<ProfileImageModel>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<ProfileImageModel>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  getAllImages():Observable<ProfileImageModel[]>{
    return this.http.get<ProfileImageModel[]>(`${environment.apiBaseUrl}/api/images`);
  }

  // returns nothing because its just changing the value of the behaviour subject
  selectImage(image: ProfileImageModel){
    // changes the value of the current behaviour to the image being passed in the request, will come from controller to here
    this.selectedImage.next(image);
    }

  onSelectImage(): Observable<ProfileImageModel>{
    return this.selectedImage.asObservable() // observer becomes the observable itself!
  }
}
