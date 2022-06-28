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
  editPost: (req, res) => {
    const { updatedText, updatedImg_url, id } = req.body;
    sequelize.query(`
        UPDATE posts
        SET text = '${updatedText}',
        img_url = '${updatedImg_url}'
        WHERE id = ${id};
        `);
  },
};
