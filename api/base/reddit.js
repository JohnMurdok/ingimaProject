var resources = require('../resources'),
request = require('request');

var reddit = {
	baseUrl: "http://www.reddit.com",
	format:"json",
	
	getUrl: function(apiKey){
		return this.baseUrl + "/" + apiKey + ".json";
	},
	
	checkParams: function(apiKey, params, requestType){
		var resourcesParams = resources[apiKey][requestType],
		isChecked = true;
		for(var i in resourcesParams){
			if(resourcesParams[i].mandatory && !params[i]){
				isChecked = false;
			}else if(!params[i]){
				params[i] = resourcesParams[i].defaultValue;
			}
			
		}
		return isChecked;
	},
	
	get: function(url, qs){
		return new Promise(function(resolve, reject){
			request({
				method: "GET",
				url:url, 
				qs:qs,
				'content-type': 'application/json'
			}, function(err, response, body) {
				if(err){
					reject(err);
					return;
				}
				var data = JSON.parse(response.body);
				resolve(data);
			});
		});
		
	},

	getPosts:function(params){
		if(!this.checkParams("posts", params, "POST")){
			console.log(params);
			return Promise.reject();
		}
		
		var url = this.getUrl(params.term),
		qs = { limit :params.limit };
		return this.get(url,qs);
	},
	
	getComments:function(params){
		if(!this.checkParams("comments", params, "POST")){
			console.log(params);
			return Promise.reject();
		}
		
		var url = this.getUrl("comments/"+params.postId),
		qs = { limit :params.limit };
		return this.get(url,qs);
	}
};

module.exports = reddit;