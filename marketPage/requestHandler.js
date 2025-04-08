const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html");

// const { log } = require("console");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(main_view);
    response.end();
  });
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  const now = new Date();
  const date = now.toISOString().split("T")[0];

  mariadb.query(
    "INSERT INTO orderlist VALUES (?, ?)",
    [productId, date],
    function (err, rows) {
      if (err) console.error("Insert Error:", err);
      else console.log("Insert Success:", rows);
    }
  );

  response.write(
    "Thank you for your order! <br> you can check the result on the order list page."
  );
  response.end();
}

function orderlist(response, productId) {
  console.log("orderlist");

  const sql = productId
    ? "SELECT * FROM orderlist WHERE product_id = ?"
    : "SELECT * FROM orderlist";

  const values = productId ? [productId] : [];

  mariadb.query(sql, values, function (err, rows) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write("Database Error");
      response.end();
      return;
    }

    const tableRows = rows
      .map((row) => {
        return `
        <tr>
          <td>${row.product_id}</td>
          <td>${new Date(row.order_date).toLocaleString()}</td>
        </tr>
      `;
      })
      .join("");

    const html = orderlist_view.toString().replace("{{tableRows}}", tableRows);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  });
}

let handle = {}; // key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* image directory */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
