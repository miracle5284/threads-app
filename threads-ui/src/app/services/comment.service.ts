import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IComment, ICommentForm} from '../interfaces/comment.interface';
import { environment } from '../../../environ'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = "") {
    let url = `${environment.apiBaseUrl}/comments`
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<IComment[]>(url);
  }

  createComment(comment: ICommentForm) {
    return this.http.post<IComment>(`${environment.apiBaseUrl}/comments`, comment);
  }

  constructor() { }
}
