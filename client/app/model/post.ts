export class Post {
  postId: string;
  date: Date;
  author: string;
  postContent: string;
}

export class PostParams {
	term: string;
	limit:number;
	offset:number;
	
	constructor(){
		this.term = "";
		this.limit = 20;
		this.offset = 0;	
	}
}