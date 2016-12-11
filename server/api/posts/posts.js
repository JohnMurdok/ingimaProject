var express = require('express'),
resources = require('../resources'),
reddit = require('../base/reddit'),
htmlEntities = require('html-entities').AllHtmlEntities,
entities = new htmlEntities(),
router = express.Router();


router.post('/',function(req,res){
	var request = reddit.getPosts(req.body);
	request.then(function(data){
		res.json(getPosts(data,req.body.offset));
	},
	function(err){
		res.sendStatus(404);
	});
});


function getPosts(jsonData, offset){
	var posts = [];
	for(var i = offset; i < jsonData.data.children.length; i++){
		if(!jsonData.data){
			continue;
		}
		var item = jsonData.data.children[i];
		posts.push({
			date: Math.floor(item.data.created * 1000),
			author: item.data.author,
			postId: item.data.id,
			postContent: entities.decode(item.data.selftext_html || "") || item.data.title || "No content"
		});		
	}
	return posts;
}
module.exports = router;