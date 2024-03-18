const express = require('express')
const router = express.Router()

const grade_handler = require('../router_handler/usergrade')

// 获得全部成绩
router.get('/all', grade_handler.getAllGrade)

// 新增成绩
router.post('/add', grade_handler.addGrade)

// 删除成绩
router.delete('/delete/:id', grade_handler.deleteGrade)

// 修改成绩
router.put('/update/:id', grade_handler.updateGrade)

// 查询成绩
router.get('/get/:id', grade_handler.getGrade)

module.exports = router
