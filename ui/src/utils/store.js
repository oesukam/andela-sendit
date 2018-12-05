const token = localStorage.getItem('token') || '';
let user = localStorage.getItem('user') || ''
const data = {
  auth: token !== '',
  token,
  user: user ? JSON.parse(user) : '',
  parcels: {
    data: [],
    page: 1,
    total: 0,
  },
  logout: function () {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.auth = false;
    this.token = null;
    this.user = '';
    this.parcels = [];
    return true;
  }
}

export default data;
