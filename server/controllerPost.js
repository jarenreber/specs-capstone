require("dotenv").config();
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

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
    // const userId = await sequelize.query(`
    //     SELECT id as user_id FROM users WHERE username = '${req.body.username}';
    // `);
    const canyonId = await sequelize.query(`
        SELECT id as canyon_id FROM canyons WHERE name = '${req.body.canyon_select}';
    `);

    sequelize
      .query(
        `
        INSERT into posts (user_id, canyon_id, text, img_url, date)
        VALUES (
            '${req.body.id}',
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
    const { name, image_url, location, description } = req.body;
    sequelize
      .query(
        `
      INSERT INTO canyons(name, image_url, location, description)
      VALUES(
        '${name}',
        '${image_url}',
        '${location}',
        '${description}'
      );
    `
      )
      .then(() => res.status(200).send("Successfully added canyon"))
      .catch((err) => {
        console.log("Error on create canyon", err);
      });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const validUser = await sequelize.query(
      `SELECT * FROM users WHERE username='${username}'`
    );
    console.log(validUser[0][0]);
    if (validUser[1].rowCount === 1) {
      if (bcrypt.compareSync(password, validUser[0][0].password)) {
        let object = {
          id: validUser[0][0].id,
          username: validUser[0][0].username,
          isAdmin: validUser[0][0].isadmin,
        };
        return res.status(200).send(object);
      } else {
        return res.status(500).send("Password Incorrect");
      }
    } else {
      return res.status(500).send("Username or password is incorrect");
    }
  },
  newUser: async (req, res) => {
    const { username, password } = req.body;
    const usernameCheck = await sequelize.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (usernameCheck[1].rowCount !== 0) {
      res.status(500).send("Username already exists");
    } else {
      const salt = bcrypt.genSaltSync(5);
      const passwordHash = bcrypt.hashSync(password, salt);

      const newUser = await sequelize.query(`
      INSERT INTO users (username, password)
      VALUES('${username}', '${passwordHash}');
      `);

      const userInfo = await sequelize.query(
        `SELECT id, username FROM users WHERE username = '${username}'`
      );

      if (newUser) {
        console.log("new user", newUser);
        return res.status(200).send(userInfo);
      } else {
        return res.status(500).send("Unsuccessful");
      }
    }
  },
};
