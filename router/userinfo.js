const express = require('express')
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 当前用户端
// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 教师端
// 获取学生列表的路由
router.get('/studentlist', userinfo_handler.getStudentList)
// 删除学生的路由
router.delete('/deleteuser/:id', userinfo_handler.deleteUser);
// 编辑学生的路由
router.put('/edituser/:id', userinfo_handler.editUser);

// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更换头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

// admin端
// 获取学生和教师列表的路由
router.get('/admingetuserlist', userinfo_handler.adminGetUserlist)
// 删除用户的路由
router.delete('/admindeleteuser/:id', userinfo_handler.adminDeleteUser)
// 编辑用户的路由
router.put('/adminedituser/:id', userinfo_handler.adminEditUser)



module.exports = router
