require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  deletePost: (req, res) => {
    const { id } = req.params;
    sequelize
      .query(
        `
    DELETE FROM posts
    WHERE id = ${id}
    `
      )
      .then((dbRes) => res.status(204).send(dbRes[0]))
      .catch((err) => console.log("Error on delete post", err));
  },
};
