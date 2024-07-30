let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");

http.createServer(function (req, res) {
	let q = url.parse(req.url, true);
	let filename = path.join(__dirname, q.pathname);

	fs.readFile(filename, function (err, data) {
		if (err) {
			fs.readFile(
				path.join(__dirname, "404.html"),
				function (err404, data404) {
					if (err404) {
						res.writeHead(500, { "Content-Type": "text/html" });
						res.end("500 Internal Server Error");
					} else {
						res.writeHead(404, { "Content-Type": "text/html" });
						res.end(data404);
					}
				}
			);
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(data);
		}
	});
}).listen(8080, () => {
	console.log("Server is listening on port 8080");
});
