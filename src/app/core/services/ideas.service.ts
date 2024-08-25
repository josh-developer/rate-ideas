import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IIdea } from '@core/models/IIdea';
import { IResponse } from '@core/models/IResponse';
import { IVote } from '@core/models/IVote';

interface Idea {
  title: string;
  description: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private httpClient$ = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

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
  getIdeas(userId: number): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get-by-user-id/' + userId);
  }

  vote(data: { isUpvote: boolean; ideaId: number }): Observable<IResponse<IVote>> {
    return this.httpClient$.post<IResponse<IVote>>(environment.api + 'idea-votes/create', JSON.stringify(data), {
      headers: this.headers,
    });
  }
}
