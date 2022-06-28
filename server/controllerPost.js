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
  createPost: async (req, res) => {
    const userId = await sequelize.query(`
        SELECT id as user_id FROM users WHERE username = '${req.body.username}';
    `);
    const canyonId = await sequelize.query(`
        SELECT id as canyon_id FROM canyons WHERE name = '${req.body.canyon_select}';
    `);

    sequelize
      .query(
        `
        INSERT into posts (user_id, canyon_id, text, img_url, date)
        VALUES (
            '${userId[0][0].user_id}',
            '${canyonId[0][0].canyon_id}',
            '${req.body.text}',
            '${req.body.img_url}',
            '${new Date()}'
            );
            `
      )
      .then(() => res.status(200).send("successfully added post"))
      .catch((err) => console.log("error on create post", err));
  },
  createCanyon: (req, res) => {
    const {} = req.body;
    sequelize.query(`
      INSERT INTO canyons(name, image_url)
    `);
  },
};
