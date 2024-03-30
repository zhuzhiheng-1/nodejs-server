const express = require('express')
const router = express.Router()

const grade_handler = require('../router_handler/usergrade')

// 获得全部成绩
router.get('/all', grade_handler.getAllGrade)

// 新增成绩
router.post('/add', grade_handler.addGrade)

// 删除成绩
router.delete('/delete/:student_id', grade_handler.deleteGrade)

// 修改成绩
router.put('/update/:student_id', grade_handler.updateGrade)

// 查询成绩
router.get('/get/:student_id', grade_handler.getGrade)

// 用户提交成绩
router.post('/submit', grade_handler.submitGrade)

module.exports = router
