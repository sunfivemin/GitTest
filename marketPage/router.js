// function route(pathname, handle, response, productId) {
//   console.log("pathname :", pathname);

//   if (typeof handle[pathname] == "function") {
//     handle[pathname](response, productId);
//   } else {
//     response.writeHead(404, { "Content-Type": "text/html; charset=utf-8;" }); // 응답 헤더 설정
//     response.write("<h1>찾으시는 페이지가 없습니다.</h1>"); // 응답 본문 작성
//     response.end(); // 응답 종료
//   }
// }
function route(pathname, handle, response, productId) {
  console.log("pathname : " + pathname);

  if (pathname === "/favicon.ico") {
    // 파비콘 요청 무시
    response.writeHead(204); // No Content
    response.end();
    return;
  }
  if (typeof handle[pathname] === "function") {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not Found");
    response.end();
  }
}
exports.route = route;
