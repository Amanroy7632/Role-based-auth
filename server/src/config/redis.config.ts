import Redis from "ioredis";
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "",
});
redis.on("connect", () => {
  console.log("\x1b[35m%s\x1b[0m", "\t\tConnected to redis server ! 🫰🫰");
});
redis.on("error", (err) => {
  console.log("\x1b[31m%s\x1b[0m", "Error connecting to redis server", err);
});

const scanAndDeleteKeys = async (pattern:string) => {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      100
    );
    cursor = nextCursor;

    if (keys.length > 0) {
      await redis.del(keys);
    }
  } while (cursor !== "0");
};

export {scanAndDeleteKeys,redis}