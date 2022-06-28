const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }
})
//ended up useing pgweb to manually add instead of adding an endpoint.
module.exports = {
    sequelize.query(`
    DROP TABLE IF EXISTS canyons;

    CREATE TABLE canyons(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        image_url VARCHAR(200),
        location VARCHAR(200) NOT NULL,
        description VARCHAR(1000)
    );

    INSERT INTO canyons (name, image_url, location, description)
    VALUES (
        'Yankee Doodle',
        'https://www.roadtripryan.com/go/resources/content/utah/zion/yankee-doodle-canyon/DSC06685.JPG',
        'Leeds',
        'A short beginners canyon that is great for quick jaunts into the wilderness. A large first repel and then a lot of smaller scrambles that are semi technical.'
    );

    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL,
        bio VARCHAR(255),
        isAdmin BOOLEAN NOT NULL DEFAULT FALSE
    );

    INSERT INTO users(username, email, password, bio, isAdmin)
    VALUES (
        'jarenreber',
        'jaren.c.reber@gmail.com',
        'salthash',
        'The creator of Canyon Social',
        true
    );

    DROP TABLE IF EXISTS posts;

    CREATE TABLE posts(
        id SERIAL PRIMARY KEY,
        text VARCHAR(255),
        img_url VARCHAR(200),
        user_id int REFERENCES users(id),
        canyon_id int REFERENCES canyons(id)
    );

    INSERT INTO posts(text, img_url, user_id, canyon_id)
    VALUES (
        'Great little canyon, not a lot of water present. Stayed dry the whole time.',
        'https://www.roadtripryan.com/go/resources/content/utah/zion/yankee-doodle-canyon/DSC06695.JPG',
        1,
        1
    );

    `)
}