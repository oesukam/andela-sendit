import faker from 'faker';

class BaseModel {
  constructor(args = {}) {
    this.arrayName = ''; // stores the name of the global variable
    this.updateFields(args);
  }

  toObject({ withHidden = false } = {}) {
    const fields = { ...this };
    const hidden = [...fields.hidden];
    delete fields.arrayName;
    delete fields.hidden;
    if (!withHidden) {
      // Delete all hidden properties before returning the object
      hidden.forEach((value) => {
        if (fields[value] !== undefined) {
          delete fields[value];
        }
      });
    }
    return { ...fields };
  }

  // Filter items by id
  findById(id = '') {
    if (!id) return null;
    const items = global[this.arrayName] || [];
    if (!id || items.length === 0) return null;
    const item = items.filter(val => val.id === id)[0] || null;
    this.updateFields(item);
    return this;
  }

  // Update given proterties
  updateFields(fields = {}) {
    const keys = Object.keys(fields);
    keys.forEach((key) => {
      if (fields[key] !== undefined) {
        this[key] = fields[key];
      }
    });
  }

  // Returns all items or an empty array
  getAll() {
    return global[this.arrayName] || [];
  }

  // Updates createdAt and updatedAt date
  updateDate() {
    // Set created at date
    if (!this.createdAt) {
      this.createdAt = Date.now();
      this.updatedAt = this.createdAt;
    } else {
      this.createdAt = Date.now();
    }
  }

  // Save properies to the array
  save({ withHidden = false } = {}) {
    // Check if the array name was set
    if (!this.arrayName) {
      throw new Error('arrayName not set');
    }
    if (!this.id) {
      this.id = faker.random.uuid();
    }
    // Check the existance of the array
    if (!global[this.arrayName]) {
      global[this.arrayName] = []; // Initialises the array
    }
    let items = global[this.arrayName];
    // If a user with the same email already exist
    if (items.some(v => v.email === this.email && v.id !== this.id)) {
      throw new Error(`${this.email} account already exist`);
    }

    this.updateDate();

    if (items.some(v => v.email === this.email)) {
      // Update the corresponded
      items = items.map((item) => {
        if (item.email === this.email) {
          item = this.toObject({ withHidden: true });
        }
        return item;
      });
      global[this.arrayName] = [...items];
    } else {
      // Add new item to the array without mutating
      global[this.arrayName] = [
        ...items,
        this.toObject({ withHidden: true }),
      ];
    }

    return this.toObject({ withHidden });
  }
}

export default BaseModel;
