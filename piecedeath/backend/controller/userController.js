import db from "../db.js";

class UserController {
  async createUser(req, res) {
    try {
      const { name, surname, thname, address, phone_number, email, password } =
        req.body;

      const check = await db.query(
        "SELECT * FROM public.person where public.person.email = $1;",
        [email]
      );
      console.log(check.rows);
      if (check.rows.length == 0) {
        const newperson = await db.query(
          "INSERT INTO person (name, surname, thname, address, phone_number, email, password) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [name, surname, thname, address, phone_number, email, password]
        );
        res.json(newperson.rows[0]);
      } else {
        res.json("Такой пользователь уже существует");
      }
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
  async getUsers(req, res) {
    const { position } = req.params;
    try {
      const users = await db.query("SELECT * FROM public.person");
      res.json(users.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async getOneUser(req, res) {
    try {
      const user = await db.query("SELECT * FROM public.person where id = $1", [
        id,
      ]);
      res.json(user);
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
  async updateUserByDirector(req, res) {
    try {
      const {
        id,
        name,
        surname,
        thname,
        position,
        address,
        phone_number,
        email,
        password,
      } = req.body;

      const newperson = await db.query(
        "UPDATE person set name = $1, surname = $2, thname = $3, position = $4, address = $5, phone_number = $6, email = $7, password = $8 where id = $9  RETURNING *",
        [
          name,
          surname,
          thname,
          position,
          address,
          phone_number,
          email,
          password,
          id,
        ]
      );
      console.log(newperson.rows);
      res.json("Successful");
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
  async updateUserByDeputyDirector(req, res) {
    try {
      const { name, surname, thname, address, phone_number } = req.body;

      const newperson = await db.query(
        "UPDATE person set name = $1, surname = $2, thname = $3, address = $4, phone_number = $5  RETURNING *",
        [name, surname, thname, address, phone_number]
      );
      res.json(newperson.rows[0]);
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await db.query("DELETE FROM public.person where id = $1", [
        id,
      ]);
      res.json("Успех");
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.query(
        "SELECT * FROM public.person where public.person.email = $1 AND public.person.password = $2;",
        [email, password]
      );
      if (user.rows[0]) {
        res.json(user.rows[0]);
      } else {
        res.json(false);
      }
    } catch (error) {
      res.json(`Ошибка ${error}`);
    }
  }
}

export default new UserController();
