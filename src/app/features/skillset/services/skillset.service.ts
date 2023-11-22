import { Injectable } from '@angular/core';
import { AddSkillsetRequest } from '../models/add-skillset-request.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Skillset } from '../models/skillset.model';
import { UpdateSkillsetRequest } from '../models/update-skillset-request.model';

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
        tap(() => console.log('Successfully fetched skillsets from api!')),
        catchError(error => {
          console.error('Error fetching skills:'+error);
          return of([]); // return an empty array if there's an error
        })
      );
  }

  getSkillsById(id: string): Observable<Skillset>{
    return this.http.get<Skillset>(`${environment.apiBaseUrl}/api/skillset/${id}`)
  }

  updateSkillset(model: UpdateSkillsetRequest, id: string):Observable<Skillset>{
    return this.http.put<Skillset>(`${environment.apiBaseUrl}/api/skillset/${id}`, model);
  }
  deleteSkillset(id: string): Observable<Skillset>{
    return this.http.delete<Skillset>(`${environment.apiBaseUrl}/api/skillset/${id}`);
  }

}
