"use strict";
exports.ServerConfig = {
    url: "http://127.0.0.1",
    port: "9000",
    api: {
        "comments": "/api/comments",
        "posts": "/api/posts"
    },
    getUrl: function (apiKey) {
        return this.url + ":" + this.port + this.api[apiKey];
    }
};
//# sourceMappingURL=server.config.js.map