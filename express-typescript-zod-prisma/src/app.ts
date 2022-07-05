import express from "express";

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log("app is running");
  });
};

main().catch((err) => {
  throw err;
});
