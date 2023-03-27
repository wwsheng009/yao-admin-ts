import { $L, Studio } from "yao-node-client";

/**
 * Cloud Function
 *
 * POST /api/__yao/app/service/foo
 * {"method":"World", "args":["hello", "world"]}
 *
 * @param  {...any} args
 * @returns
 */
function World(...args: any[]) {
  return {
    message: $L("Another yao application") + " (Studio Function: hello.World)",
    args: args,
  };
}

function testWorld() {
  let res = World(["hello", "world"]);
  console.log(res);
}
function callHub() {
  let rest = Studio("test.Hub", "hello");
  console.log(rest);
}
callHub();
