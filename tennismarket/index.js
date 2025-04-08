let server = require("./server");
let router = require("./router");
let requestHandler = require("./requestHandler");

const mariadb = require("./database/connect/mariadb");

mariadb.connect();

// 서버 시작 시 라우터 함수 연결
server.start(router.route, requestHandler.handle);
