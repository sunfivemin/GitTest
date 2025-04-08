// 1. http 모듈 불러오기
let http = require("http");
let url = require("url");

function start(route, handle) {
  // 2. 요청(request)과 응답(response)을 처리하는 함수 정의
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    const queryData = url.parse(request.url, true).query;

    console.log("pathname :", pathname);
    console.log("productId :", queryData.productId);

    route(pathname, handle, response, queryData.productId);
  }
  // 3. 서버 생성 후 8888번 포트로 실행
  http.createServer(onRequest).listen(8080);
}

// 외부에서 사용할 수 있도록 start 함수 내보내기
exports.start = start;
