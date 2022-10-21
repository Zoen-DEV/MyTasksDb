import db from "./src/models";
import app from "./app";

const port = process.env.PORT || 3001;

db.sequelize.sync({ force: true }).then(async () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});