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
  navCanyons: (req, res) => {
    sequelize
      .query(
        `
        SELECT name FROM canyons;
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("Error on get canyons", err));
  },
  canyonMain: (req, res) => {
    const { canyon } = req.query;
    sequelize
      .query(
        `
    SELECT * FROM canyons
    WHERE name = '${canyon}';
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("Backend canyonMain error", err));
  },
  postsCanyon: (req, res) => {
    const { canyon } = req.query;
    sequelize
      .query(
        `
    SELECT posts.text, posts.img_url, users.username, posts.date, canyons.id as canyonid, posts.id as postid
    FROM posts
    JOIN canyons ON posts.canyon_id=canyons.id
    JOIN users ON posts.user_id=users.id
    WHERE canyons.name = '${canyon}';    
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("Backend posts canyon error", err));
  },
  getPost: (req, res) => {
    const { postid } = req.query;
    sequelize
      .query(
        `
      SELECT id, text, img_url
      FROM posts
      WHERE id = ${postid};
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("Error on edit canyon post"));
  },
};
