const createTableParcels = `
CREATE TABLE IF NOT EXISTS
  parcels (
    id UUID PRIMARY KEY,
    user_id UUID,
    tracking_number VARCHAR(30),
    from_province VARCHAR(255) NOT NULL,
    from_district VARCHAR(255) NOT NULL,
    to_province VARCHAR(255) NOT NULL,
    to_district VARCHAR(255) NOT NULL,
    present_location VARCHAR(255) NOT NULL DEFAULT 'In Transit',
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_names VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    weight INT,
    price INT,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'In Transit',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

const dropTableParcels = 'DROP TABLE IF EXISTS parcels';

const insertParcel = `INSERT INTO parcels (
  id,
  user_id,
  tracking_number,
  from_province,
  from_district,
  to_province,
  to_district,
  present_location,
  receiver_names,
  receiver_phone,
  receiver_address,
  weight,
  price,
  description,
  status,
  updated_at,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
ON CONFLICT DO NOTHING returning * `;

const queryAllParcels = 'SELECT * FROM parcels LIMIT 25 OFFSET $1';
const queryAllParcelsByUser = 'SELECT * FROM parcels WHERE user_id = $2 LIMIT 25 OFFSET $1';

const queryParcelById = 'SELECT * FROM parcels WHERE id = $1';

const queryFirstParcel = 'SELECT * FROM parcels WHERE id = $1 LIMIT 1';

const updateParcelPresentLocation = 'UPDATE parcels SET presentLocation = $2 WHERE id = $1';
const updateParcelStatus = 'UPDATE parcels SET status = $2 WHERE id = $1';
const updateParcelDestination = `UPDATE parcels 
  SET to_province = $2, to_district = $3 WHERE id = $1
`;

export default {
  createTableParcels,
  dropTableParcels,
  insertParcel,
  updateParcelPresentLocation,
  updateParcelStatus,
  updateParcelDestination,
  queryAllParcels,
  queryAllParcelsByUser,
  queryParcelById,
  queryFirstParcel,
};
