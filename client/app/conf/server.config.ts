export const ServerConfig = {
	url : "http://127.0.0.1",
	port : "9000",
	
	api : {
		"comments":"/api/comments",
		"posts":"/api/posts"
	},
	
	getUrl(apiKey: string){
		return this.url + ":" + this.port + this.api[apiKey];
	}
}