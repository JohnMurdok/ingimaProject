import {Injectable} from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import { Comment, CommentParams } from '../model/comment';

@Injectable()
export class CommentService {
  constructor (private http: Http) {}

  getComments(params: CommentParams): Observable<Comment[]> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
	
    return this.http.post('http://127.0.0.1:9000/api/comments/', params, options)
                    .map(this.extractCommentData)
                    .catch(this.handleError);
  }

  private extractCommentData(res: Response) {
    let body = res.json();
    let comments: Comment[] = [];

    for (var item in body){
      let comment = body[item];
      let postData: Comment = {
          postId: comment.postId,
		  date: comment.date,
		  author: comment.author,
		  commentId: comment.commentId,
		  commentContent: comment.commentContent
      };
      comments.push(postData);
    }
    return comments;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
