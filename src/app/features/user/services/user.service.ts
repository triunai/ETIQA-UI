import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserModel } from '../models/add-user-model';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';
import { UpdateUserModel } from '../models/update-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(model: AddUserModel):Observable<User> {

    return this.http.post<User>(`${environment.apiBaseUrl}/api/user`, model);

  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/api/user`).pipe(
      tap((data) => console.log('Successfully fetched all users!!'+data)),
      catchError(err => {
        console.error('Error fetching users!', err.message, 'Status Code:', err.status);

        return of([]);
      })
    );
  }

  getUsersById(id: string): Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/api/user/${id}`);
  }

  updateUsersById(model: UpdateUserModel, id: string): Observable<User>{
    return this.http.put<User>(`${environment.apiBaseUrl}/api/user/${id}`, model);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`${environment.apiBaseUrl}/api/user/${id}`);
  }

  // get by url handle?
  // getBlogpostsByUrl(urlHandle: string):Observable<BlogPost>{
  //   return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${urlHandle}`);
  // }
}
