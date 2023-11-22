import { Injectable } from '@angular/core';
import { AddSkillsetRequest } from '../models/add-skillset-request.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Skillset } from '../models/skillset.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsetService {

  constructor(private http: HttpClient) { }

  addSkillset(model: AddSkillsetRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/skillset`, model)
  }

  //modified this to handle Async Pipes
  getAllSkillsets(): Observable<Skillset[]> {
    return this.http.get<Skillset[]>(`${environment.apiBaseUrl}/api/skillset`)
      .pipe(
        tap(() => console.log('Successfully fetched skillsets from skillset service!')),
        catchError(error => {
          console.error('Error fetching skills:'+error);
          return of([]); // return an empty array if there's an error
        })
      );
  }
}
