
import app from "./app";
const startServer = async () => {
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log("Listining at Port: ", PORT);
    process.on("uncaughtException", async (error) => {
      console.log(error);
      process.exit(1);
    });
  });
};
startServer()
  .then(() => {
    console.log("Server started successfully.");
  })
  .catch((error) => {
    console.log("Failed to start serverice", error);
  });
