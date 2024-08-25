import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IIdea } from '@core/models/IIdea';
import { IResponse } from '@core/models/IResponse';

interface Idea {
  title: string;
  description: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  httpClient$ = inject(HttpClient);

  getAllIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get-all');
  }
  addIdeas(body: any) {
    const json = localStorage.getItem('user');
    const user = JSON.parse(json!);
    const header = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + user.token,
    });
    const data = body as Idea;

    const formData = Object.entries(data).reduce((fd, [key, val]) => {
      fd.append(key, val);
      return fd;
    }, new FormData());
    console.log(body);

    return this.httpClient$.post(environment.api + 'ideas/create', formData, { headers: header });
  }
}
