const connection = require('../../config/mysql.js');
const path = require('path');
const fs = require('fs');

// ambil dari routes
const index = (req, res) => {
  // search
  //   nulisnya http://localhost:3000/api/v1/product?search=ROG
  const { search } = req.query;
  let eks = {};
  if (search) {
    eks = {
      sql: 'SELECT * FROM products WHERE name LIKE ?',
      values: [`%${search}%`],
    };
  } else {
    eks = {
      sql: 'SELECT * FROM products',
    };
  }
  connection.query(eks, _response(res));
};
const detail = (req, res) => {
  connection.query(
    {
      sql: 'SELECT * FROM products WHERE id = ?',
      values: [req.params.id],
    },
    _response(res)
  );
};
// delete, method delete
// hapus pake insomnia
const destroy = (req, res) => {
  connection.query(
    {
      sql: 'DELETE FROM products WHERE id = ?',
      values: [req.params.id],
    },
    _response(res)
  );
};
//metode post
const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    //
    fs.renameSync(image.path, target);
    //
    connection.query(
      {
        sql: 'INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?,?)',
        // dikasi parseInt agar jadi integer tanpa keraguan
        values: [parseInt(users_id), name, price, stock, status, ` http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};
// update dengan method put
const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = '';
  let values = [];
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    //
    fs.renameSync(image.path, target);
    //
    sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
    values = [parseInt(users_id), name, price, stock, status, ` http://localhost:3000/public/${image.originalname} `, req.params.id];
    //
  } else {
    sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?';
    values = [parseInt(users_id), name, price, stock, status, req.params.id];
  }
  connection.query(
    {
      sql,
      values,
    },
    _response(res)
  );
};
const _response = (res) => {
  return (error, results) => {
    if (error) {
      res.send({
        status: 'failed',
        response: error,
      });
    } else {
      res.send({
        status: 'success',
        response: results,
      });
    }
  };
};

module.exports = {
  index,
  detail,
  store,
  update,
  destroy,
};
