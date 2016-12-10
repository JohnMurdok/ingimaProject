/**
* Resources exposed by the API
* routers : []
* apiName : {
*    GET : {
*		"param1:{
*			"mandatory":true/false
*		}
*     
*   }	
* }
*/
module.exports = {
	"routers": ["posts", "comments"],
	"posts": {
		"POST": {
			'term': {
				"mandatory": true
			},
			'limit': {
				"mandatory": false,
				"defaultValue": 20
			},
			'offset':{
				"mandatory": false,
				"defaultValue": 0
			}
		}
	},
	"comments": {
		"POST": {
				'postId': {
					"mandatory": true
				},
				'limit': {
					"mandatory": false,
					"defaultValue": 20
				},
				'offset':{
					"mandatory": false,
					"defaultValue": 0
				}
		}
	}
}