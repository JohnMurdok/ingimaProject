export class Comment {
  postId: string;
  date: number;
  commentId: string;
  author: string;
  commentContent: string;
}

export class CommentParams {
	postId: string;
	limit:number;
	offset:number;
	
	constructor(){
		this.postId = "";
		this.limit = 20;
		this.offset = 0;	
	}
}