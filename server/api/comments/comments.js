var express = require('express'),
resources = require('../resources'),
reddit = require('../base/reddit'),
htmlEntities = require('html-entities').AllHtmlEntities,
entities = new htmlEntities(),
router = express.Router();


router.post('/',function(req,res){
	var request = reddit.getComments(req.body);
	request.then(function(data){
		res.json(getComments(data,req.body.offset));
	},
	function(err){
		res.sendStatus(404);
	});
});

function getComments(jsonData, offset){
	var comments = [];
	for(var i = offset; i < jsonData.length; i++){
		var comment = jsonData[i];
		if(!comment || !comment.data || !comment.data.children){
			continue;
		}
		for(var j = 0; j < comment.data.children.length; j++){
			var item = comment.data.children[j]; 
			if(!item || !item.data){
				continue;
			}
			comments.push({
				date:Math.floor(item.data.created * 1000),
				author: item.data.author,
				postId: item.data.parent_id,
				commentId: item.data.id,
				commentContent: item.data.body
			});		
		}
	}
	return comments;
}
module.exports = router;