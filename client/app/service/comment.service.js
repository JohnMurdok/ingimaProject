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
var CommentService = (function () {
    function CommentService(http) {
        this.http = http;
    }
    CommentService.prototype.getComments = function (params) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://127.0.0.1:9000/api/comments/', params, options)
            .map(this.extractCommentData)
            .catch(this.handleError);
    };
    CommentService.prototype.extractCommentData = function (res) {
        var body = res.json();
        var comments = [];
        for (var item in body) {
            var comment = body[item];
            var postData = {
                postId: comment.postId,
                date: comment.date,
                author: comment.author,
                commentId: comment.commentId,
                commentContent: comment.commentContent
            };
            comments.push(postData);
        }
        return comments;
    };
    CommentService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    CommentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], CommentService);
    return CommentService;
    var _a;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map