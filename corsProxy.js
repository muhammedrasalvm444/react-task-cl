const cors_anywhere = require("cors-anywhere");

const host = "0.0.0.0";
const port = 8080;

cors_anywhere
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Empty array means no required headers
    removeHeaders: ["cookie", "cookie2"], // Remove cookies
  })
  .listen(port, host, function () {
    console.log("CORS Anywhere is running on " + host + ":" + port);
  });
