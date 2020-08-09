import { v1 as uuidv1 } from "uuid";

function generateUUID() {
  return uuidv1();
}

module.exports = { generateUUID };
