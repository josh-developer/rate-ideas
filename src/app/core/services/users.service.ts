import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@core/models/IResponse';
import { IUser } from '@core/models/IUser';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http$ = inject(HttpClient);

  getUser(): Observable<IResponse<IUser>> {
    const json = localStorage.getItem('user');
    const user = JSON.parse(json!);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + user.token,
    });

    return this.http$.get<IResponse<IUser>>(environment.api + 'users/get', { headers });
  }
}
