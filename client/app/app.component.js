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
var post_service_1 = require('./service/post.service');
var comment_service_1 = require('./service/comment.service');
var post_1 = require('./model/post');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AppComponent = (function () {
    function AppComponent(_PostService, _CommentService) {
        this._PostService = _PostService;
        this._CommentService = _CommentService;
        this.name = "Ingima";
        this.postParams = {
            term: 'hot',
            limit: 20,
            offset: 0
        };
        this.commentParams = {
            postId: null,
            limit: 20,
            offset: 0
        };
        this.commentsShown = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.requestPosts();
    };
    AppComponent.prototype.onSubmit = function () {
        this.requestPosts();
    };
    AppComponent.prototype.onCommentSubmit = function () {
        if (!this.commentParams.postId) {
            return;
        }
        this.comments = [];
        this.onShowComment(this.commentParams.postId);
    };
    AppComponent.prototype.requestPosts = function () {
        var _this = this;
        if (this.obsRequestPost) {
            this.obsRequestPost.unsubscribe();
        }
        this.commentsShown = false;
        this.obsRequestPost = this._PostService.getPosts(this.postParams).subscribe(function (posts) { _this.posts = posts; _this.obsRequestPost = null; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.onShowComment = function (postId) {
        var _this = this;
        this.commentParams.postId = postId;
        if (this.obsRequestComment) {
            this.obsRequestComment.unsubscribe();
        }
        this.obsRequestComment = this._CommentService.getComments(this.commentParams).subscribe(function (comments) { _this.comments = comments; _this.obsRequestComment = null; _this.commentsShown = true; }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.PostParams)
    ], AppComponent.prototype, "postParams", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t <div class=\"form\">\n\t\t<div class=\"header\">\n\t\t\t<p>Ingima test technique</p>\n\t\t</div>\n\t\t<div class=\"body\">\n\t\t\t<h3>Post form</h3>\n\t\t\t<form (ngSubmit)=\"onSubmit()\" class=\"input\">\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<label>Term: </label>\n\t\t\t\t\t<select value=\"{{postParams.term}}\" placeholder=\"term\" [(ngModel)]=\"postParams.term\" name=\"term\">\n\t\t\t\t\t  <option value=\"new\">New</option>\n\t\t\t\t\t  <option value=\"hot\">Hot</option>\n\t\t\t\t\t  <option value=\"random\">Random</option>\n\t\t\t\t\t  <option value=\"rising\">Rising</option>\n\t\t\t\t\t  <option value=\"top\">Top</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<label>Limit: </label>\n\t\t\t\t\t<input value=\"{{postParams.limit}}\" placeholder=\"limit\" [(ngModel)]=\"postParams.limit\" name=\"limit\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<label>Offset: </label>\n\t\t\t\t\t<input value=\"{{postParams.offset}}\" placeholder=\"offset\"  [(ngModel)]=\"postParams.offset\" name=\"offset\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t\t<hr>\n\t\t\t<h3>Comment form</h3>\n\t\t\t<form (ngSubmit)=\"onCommentSubmit()\" class=\"input\">\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<label>Limit: </label>\n\t\t\t\t\t<input value=\"{{commentParams.limit}}\" placeholder=\"limit\" [(ngModel)]=\"commentParams.limit\" name=\"limit\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<label>Offset: </label>\n\t\t\t\t\t<input value=\"{{commentParams.offset}}\" placeholder=\"offset\"  [(ngModel)]=\"commentParams.offset\" name=\"offset\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t </div>\n     <ul class=\"posts\">\n\t  <li *ngFor=\"let post of posts\" class=\"post\">\n\t\t  <div class=\"header\">\n\t\t\t<p class=\"postId\">{{post.postId}} - {{post.author}}</p>\n\t\t\t<p class=\"date\">{{post.date | date: 'dd/MM/yyyy' }}</p>\n\t\t  </div>\n\t\t  <div class=\"body\" [innerHTML]=\"post.postContent\">\n\t\t  </div>\n\t\t  <div class=\"footer\" (click)=\"onShowComment(post.postId)\">\n\t\t\t<p>Show comment</p>\n\t\t  </div>\n\t  </li>\n\t</ul>\n\t<div class=\"rightPanel\" [class.selected]=\"commentsShown\">\n\t\t<div class=\"header\">\n\t\t\t<p>Comments</p>\n\t\t</div>\n\t\t<ul class=\"comments\">\n\t\t  <li *ngFor=\"let comment of comments\" class=\"comment\">\n\t\t    <div class=\"header\">\n\t\t\t\t<div class=\"profile\"></div>\n\t\t\t\t<p>{{comment.commentId}} - <span class=\"author\">{{comment.author}}</span></p>\n\t\t\t\t<p><span class=\"date\">{{comment.date  | date: 'dd/MM/yyyy HH:mm:ss' }}</span></p>\n\t\t\t</div>\n\t\t  <div class=\"body\" [innerHTML]=\"comment.commentContent\">\n\t\t  </div>\t\t\n\t\t  </li>\n\t\t</ul>\n\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService, comment_service_1.CommentService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map