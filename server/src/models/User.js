
import moment from 'moment';
import BaseModel from './BaseModel';
import db from '../db';
import { usersQuery } from '../db/queries';
import logger from '../helpers/logger';

class User extends BaseModel {
  constructor(args) {
    super(args);
    this.storage = 'users';
    this.user_type = 'user'; // Normal user type by default
    this.hidden = ['password', 'confirmation_code'];
  }

  // Find user by email
  findByEmail(email = '') {
    return new Promise((resolve, reject) => {
      db.query(usersQuery.queryUserByEmail, [email])
        .then((res) => {
          const row = res.rows[0];
          this.updateFields(row);
          resolve({ data: row });
        })
        .catch((err) => {
          logger.error(err);
          reject(new Error('Failed, could query the user'));
        });
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      const now = moment().format();
      const record = [
        this.id || this.getUID(),
        this.email, this.password, this.first_name, this.last_name,
        this.birth_date, this.gender, this.province, this.district,
        this.city, this.address || 'Address', this.user_type, this.confirmed || 'pending',
        this.confirmation_code, this.createdAt || now, now,
      ];
      db.query(usersQuery.insertUser, record)
        .then((res) => {
          const row = res.rows[0];
          this.updateFields(row);
          resolve(row);
        })
        .catch((err) => {
          console.log(err);
          logger.error(err);
          reject(new Error('Failed, could not save'));
        });
    });
  }
}

export default User;
