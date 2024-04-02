// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 教师端
// 获取所有学生列表的处理函数
exports.getStudentList = (req, res) => {
  const sql = `SELECT id, student_id, nickname, classname, major FROM users WHERE role='student'`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取学生列表成功！',
      data: results,
    })
  })
}
// 删除用户的处理函数
exports.deleteUser = (req, res) => {
  const userId = req.params.id; // 获取前端传来的用户 ID

  const sql = 'DELETE FROM users WHERE id = ?'; 

  db.query(sql, [userId], (err, results) => { 
    if (err) { // 错误处理
      return res.status(500).json({
        status: 500,
        message: '删除用户失败',
        error: err.message
      });
    }
    // 如果未找到符合条件的记录
    if (results.affectedRows === 0) { 
      return res.status(404).json({
        status: 404,
        message: '未找到符合条件的用户信息'
      });
    }

    res.status(200).json({
      status: 200,
      message: '删除用户成功',
      data: results
    });
  });
};
// 编辑用户的处理函数
exports.editUser = (req, res) => {
  const userId = req.params.id;
  const { nickname, student_id, classname,major } = req.body;
  // 构造 SQL 更新语句
  const sql = `UPDATE users SET student_id=?, nickname=?, classname=?, major=? WHERE id=?`;
  // 执行 SQL 更新操作
  db.query(sql, [student_id, nickname, classname, major, userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: '保存编辑失败',
        error: err.message
      });
    }

    // 返回保存成功的响应
    res.status(200).json({
      status: 200,
      message: '保存编辑成功',
      data: results
    });
  });
};

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  const id = req.params.id;
  const { oldPwd, newPwd } = req.body; // 从请求体中解构出 id、oldPwd 和 newPwd
  console.log(id, oldPwd, newPwd);
  // 根据 id 查询用户的信息
  const sql = `SELECT * FROM users WHERE id = ?`;
  // 执行根据 id 查询用户的信息的 SQL 语句
  db.query(sql, [id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')

    // 定义更新密码的 SQL 语句
    const updateSql = `UPDATE users SET password = ? WHERE id = ?`;
    // 对新密码进行加密处理
    const newPwdHash = bcrypt.hashSync(newPwd, 10)
    // 调用 db.query() 执行更新密码的 SQL 语句
    db.query(updateSql, [newPwdHash, id], (err, updateResults) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (updateResults.affectedRows !== 1) return res.cc('更新密码失败！')
      // 成功
      res.cc('更新密码成功', 0)
    })
  })
}
// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const { id } = req.body
  console.log(req.body)
  // 1. 定义更新头像的 SQL 语句
  const sql = `update users set avatar=? where id=?`
  // 2. 调用 db.query() 执行 SQL 语句
  db.query(sql, [req.body.avatar, id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    res.cc('更换头像成功！', 0)
  })
}
// 更新个人信息处理函数
exports.updateUserInfo = (req, res) => {
  const id = req.params.id;
  const { nickname, student_id, classname, major } = req.body;
  const sql = `update users set student_id=?, nickname=?, classname=?, major=? where id = ?`;
  db.query(sql, [student_id, nickname, classname, major, id], (err, results) => {
    if (err) return res.cc(err);
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更新用户信息失败！')
    // 成功
    res.cc('更新用户信息成功！', 0)
  })
}


// admin端
// 获取全部学生和教师的基本信息的处理函数
exports.adminGetUserlist = (req, res) =>{
  const sql = `SELECT id, username, nickname, student_id, classname, major, role FROM users where role='student' OR role='teacher'`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取用户列表成功！',
      data: results,
    })
  })
}
// 删除用户的处理函数
exports.adminDeleteUser = (req, res) =>{
  const userId = req.params.id; // 获取前端传来的用户 ID

  const sql = 'DELETE FROM users WHERE id = ?'; 

  db.query(sql, [userId], (err, results) => { 
    if (err) { // 错误处理
      return res.status(500).json({
        status: 500,
        message: '删除用户失败',
        error: err.message
      });
    }
    // 如果未找到符合条件的记录
    if (results.affectedRows === 0) { 
      return res.status(404).json({
        status: 404,
        message: '未找到符合条件的用户信息'
      });
    }

    res.status(200).json({
      status: 200,
      message: '删除用户成功',
      data: results
    });
  });
}
// 编辑用户的处理函数
exports.adminEditUser = (req, res) =>{
  const userId = req.params.id;
  const { username, nickname, student_id, classname, major, role } = req.body;
  // 构造 SQL 更新语句
  const sql = `UPDATE users SET student_id=?, username=?, nickname=?, classname=?, major=?,role=? WHERE id=?`;
  // 执行 SQL 更新操作
  db.query(sql, [student_id, username, nickname, classname, major, role, userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: '保存编辑失败',
        error: err.message
      });
    }

    // 返回保存成功的响应
    res.status(200).json({
      status: 200,
      message: '保存编辑成功',
      data: results
    });
  });
}