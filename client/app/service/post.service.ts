import {Injectable} from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {ServerConfig} from '../conf/server.config';
import { Post, PostParams } from '../model/post';

@Injectable()
export class PostService {
  constructor (private http: Http) {}

  getPosts(params: PostParams): Observable<Post[]> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
	
    return this.http.post(ServerConfig.getUrl('posts'), params, options)
                    .map(this.extractPostData)
                    .catch(this.handleError);
  }

  private extractPostData(res: Response) {
    let body = res.json();
    let posts: Post[] = [];

    for (var item in body){
      let post = body[item];
      let postData: Post = {
          postId: post.postId,
		  date: new Date(post.date),
		  author: post.author,
		  postContent: post.postContent
      };
      posts.push(postData);
    }
    return posts;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
