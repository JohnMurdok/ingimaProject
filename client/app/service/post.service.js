"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var Observable_1 = require('rxjs/Observable');
var PostService = (function () {
    function PostService(http) {
        this.http = http;
    }
    PostService.prototype.getPosts = function (params) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://127.0.0.1:9000/api/posts/', params, options)
            .map(this.extractPostData)
            .catch(this.handleError);
    };
    PostService.prototype.extractPostData = function (res) {
        var body = res.json();
        var posts = [];
        for (var item in body) {
            var post = body[item];
            var postData = {
                postId: post.postId,
                date: new Date(post.date),
                author: post.author,
                postContent: post.postContent
            };
            posts.push(postData);
        }
        return posts;
    };
    PostService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], PostService);
    return PostService;
    var _a;
}());
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map