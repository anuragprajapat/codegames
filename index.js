var express = require("express");
const bodyParser = require("body-parser");

var env = process.env.NODE_ENV || "development";
var config = require("./config")[env];

var app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/game.routes")(app);
require("./routes/player.routes")(app);
require("./routes/wordMatrix.routes")(app);

app.listen(config.app.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
    return;
  }
  console.log(`
        ################################################
        🛡️  Server listening on port: ${config.app.port} 🛡️ 
        ################################################
    `);
});

/*   


/createGame     Creates game
/joinGame       Join a game

*/
