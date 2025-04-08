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
