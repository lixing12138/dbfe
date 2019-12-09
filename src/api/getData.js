import fetch from '../config/fetch'

/**
 * 登录
 */
export const login = data => fetch('/users.php', data);

/**
 * 退出
 */
export const logout = (data) => fetch('/users.php', data);

/**
 * 获取用户信息
 */
export const getUserInfo = () => fetch('/users/current.php');


/**
 * 管理员上传学生信息
 */
export const uploadStudentInfo = data => fetch('/admins/students/upload.php', data, 'POST');
/**
 * 管理员添加学生信息
 */
export const addStudentInfo = data => fetch('/admins/students.php', data, 'POST');
/**
 * 管理员修改学生信息
 */
export const putStudentInfo = data => fetch('/admins/students.php', data, 'PUT');
/**
 * 管理员删除学生信息
 */
export const deleteStudentInfo = data => fetch('/admins/students.php', data, 'DELETE');
/**
 * 管理员获取学生信息
 */
export const getStudentInfo = data => fetch('/admins/students.php', data, 'GET')


/**
 * 管理员上传教师信息
 */
export const uploadTeacherInfo = data => fetch('/admins/tearchers/upload', data, 'POST');
/**
 * 管理员添加教师信息
 */
export const addTeacherInfo = data => fetch('/admins/tearchers', data, 'POST');
/**
 * 管理员修改教师信息
 */
export const putTeacherInfo = data => fetch('/admins/tearchers', data, 'PUT');
/**
 * 管理员删除教师信息
 */
export const deleteTeacherInfo = data => fetch('/admins/tearchers', data, 'DELETE');
/**
 * 管理员获取教师信息
 */
export const getTeacherInfo = data => fetch('/admins/tearchers', data, 'GET')



/**
 * 管理员上传课程信息
 */
export const uploadCourseInfo = data => fetch('/admins/courses/upload', data, 'POST');
/**
 * 管理员添加课程信息
 */
export const addCourseInfo = data => fetch('/admins/courses', data, 'POST');
/**
 * 管理员修改课程信息
 */
export const putCourseInfo = data => fetch('/admins/courses', data, 'PUT');
/**
 * 管理员删除课程信息
 */
export const deleteCourseInfo = data => fetch('/admins/courses', data, 'DELETE');
/**
 * 管理员获取课程信息
 */
export const getCourseInfo = data => fetch('/admins/courses', data, 'GET')


/**
 * 管理员上传开课信息
 */
export const uploadSectionInfo = data => fetch('/admins/sections/upload', data, 'POST')