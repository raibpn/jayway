// Importing module
import express from 'express';

const server = express();
const PORT: Number = 5000;
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("morgan");
var cors = require('cors')

server.use(cors())

// Handling GET / Request
server.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})

// Server setup
server.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
})

//Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

router.post('/handle', (request, response) => {
     console.log(request.body);
    //To access POST variable use req.body()methods.
    const n = request.body.n;
    const commands = request.body.commands;
    const inputX = request.body.x;
    const inputY = request.body.y;
    const inputD = request.body.d;
    console.log(n, commands, inputX, inputY, inputD)

    // backend
    const directions = ["N", "E", "S", "W"]

    let robot = new Robot(inputX, inputY, directions.indexOf(inputD));

    for (var i = 0; i < commands.length; i++) {
        const command = commands.charAt(i);
        if (command === "R") {
            robot.d = (robot.d + 1) % 4;

        }
        if (command === "L") {
            robot.d = (robot.d + 3) % 4;

        }
        if (command === "F") {
            if (directions[robot.d] === "N") {
                if (robot.y - 1 >= 0) {
                    robot.y--
                }
            }

            if (directions[robot.d] === "W") {
                if (robot.x - 1 >= 0) {
                    robot.x--
                }
            }

            if (directions[robot.d] === "E") {
                if (robot.x + 1 < n) {
                    robot.x++
                }
            }

            if (directions[robot.d] === "S") {
                if (robot.y + 1 < n) {
                    robot.y++
                }
            }

        }

    }

    console.log(robot.x, robot.y, robot.d)
    response.json({
        x: robot.x,
        y: robot.y,
        d: directions[robot.d]
    })
});

// add router in the Express app.
server.use("/", router);


class Robot {
    n: number;
    x: number; //x-axis
    y: number; //y-axis
    d: number; //direection

    constructor(n:number, x: number, y: number, d: number) {
        this.n = n;
        this.x = x;
        this.y = y;
        this.d = d;
    }


}