import * as mqtt from "mqtt"; // import everything inside the mqtt module and give it the namespace "mqtt"
const options = {
  port: 1884,
  clientId: "Luca-messages",
  clean: false,
};

let client = mqtt.connect("WSS://abb-mosca.cloud.abbspets.se", options); // create a client

export { client };
