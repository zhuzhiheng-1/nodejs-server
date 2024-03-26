// 导入数据库操作模块
const db = require('../db/index')
// 获得全部成绩
exports.getAllGrade = (req, res) => {
  const sql = 'SELECT grade.*, users.nickname FROM grade JOIN users ON grade.student_id = users.student_id';
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '获取全部成绩成功！',
      data: results
    });
  });
};


// 新增成绩
exports.addGrade = (req, res) => {
  const { student_id, theory_score, basic_score, extension_score, total_score, exam_date } = req.body
  const sql = 'INSERT INTO grade  (student_id, theory_score, basic_score, extension_score, total_score, exam_date) VALUES (?, ?, ?, ?, ?, ?)'
  db.query(sql, [student_id, theory_score, basic_score, extension_score, total_score, exam_date], (err, results) => {
    if (err) return res.cc(err)
    res.cc('新增成绩成功！', 0)
  })
}

// 删除成绩
exports.deleteGrade = (req, res) => {
  const { student_id } = req.params
  const sql = 'DELETE FROM grade WHERE student_id = ?'
  db.query(sql, student_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 0) return res.cc('删除失败，记录不存在！', 1)
    res.cc('删除成功！', 0)
  })
}

// 修改成绩
exports.updateGrade = (req, res) => {
  const { student_id } = req.params
  const { theory_score, basic_score, extension_score, total_score } = req.body
  const sql = 'UPDATE grade SET theory_score=?, basic_score=?, extension_score=?, total_score=? WHERE student_id=?'
  db.query(sql, [theory_score, basic_score, extension_score, total_score, student_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 0) return res.cc('修改失败，记录不存在！', 1)
    res.cc('修改成功！', 0)
  })
}



// 查询成绩
exports.getGrade = (req, res) => {
  const { student_id } = req.params;
  const sql = `
    SELECT grade.*, users.nickname
    FROM grade
    JOIN users ON grade.student_id = users.student_id
    WHERE grade.student_id = ?
  `;
  db.query(sql, student_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc('查询失败，记录不存在！', 1);
    res.send({ status: 0, message: '查询成功！', data: results[0] });
  });
};

