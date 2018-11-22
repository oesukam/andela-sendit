import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../db';
import { usersQuery } from '../db/queries';

const initUsers = async () => {
  const now = moment().format();
  await db.query(usersQuery.insert, [
    '648da554-e42f-40dc-92d3-649e3865fd72', // id
    'admin@email.com', // user email
    bcrypt.hashSync('admin@admin', 10), // password
    'Admin', // first_name
    'Admin', // last_name
    null,
    'Male', // gender
    'Kigali', // province
    'Nyarungege', // district
    'admin', // user_type
    true, // confirmed
    null, // confirmation_code
    now,
    now,
  ]);

  await db.query(usersQuery.insert, [
    '97cf377c-5735-4f5d-8645-c8fb4b5c5af3', // id
    'user@email.com', // user email
    bcrypt.hashSync('user@user', 10), // password
    'User', // first_name
    'User', // last_name
    null,
    'Female', // gender
    'Kigali', // province
    'Nyarungege', // district
    'user', // user_type
    true, // confirmed
    null, // confirmation_code
  ]);
};

export default initUsers;
