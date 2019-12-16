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
 * 判断是否到选课时间
 */
export const isTime = () => fetch('/admins/time.php');

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
export const putStudentInfo = data => fetch('/admins/students/update.php', data, 'POST');
/**
 * 管理员删除学生信息
 */
export const deleteStudentInfo = data => fetch('/admins/students/delete.php', data);
/**
 * 管理员获取学生信息
 */
export const getStudentInfo = data => fetch('/admins/students.php', data, 'GET')


/**
 * 管理员上传教师信息
 */
export const uploadTeacherInfo = data => fetch('/admins/teachers/upload.php', data, 'POST');
/**
 * 管理员添加教师信息
 */
export const addTeacherInfo = data => fetch('/admins/teachers.php', data, 'POST');
/**
 * 管理员修改教师信息
 */
export const putTeacherInfo = data => fetch('/admins/teachers/update.php', data, 'POST');
/**
 * 管理员删除教师信息
 */
export const deleteTeacherInfo = data => fetch('/admins/teachers/delete.php', data);
/**
 * 管理员获取教师信息
 */
export const getTeacherInfo = data => fetch('/admins/teachers.php', data)



/**
 * 管理员上传课程信息
 */
export const uploadCourseInfo = data => fetch('/admins/courses/upload.php', data, 'POST');
/**
 * 管理员添加课程信息
 */
export const addCourseInfo = data => fetch('/admins/courses.php', data, 'POST');
/**
 * 管理员修改课程信息
 */
export const putCourseInfo = data => fetch('/admins/courses/update.php', data, 'POST');
/**
 * 管理员删除课程信息
 */
export const deleteCourseInfo = data => fetch('/admins/courses/delete.php', data);
/**
 * 管理员获取课程信息
 */
export const getCourseInfo = data => fetch('/admins/courses.php', data, 'GET');



/**
 * 管理员上传开课信息
 */
export const uploadSectionInfo = data => fetch('/admins/sections/upload.php', data, 'POST');
/**
 * 管理员添加开课信息
 */
export const addSectionInfo = data => fetch('/admins/sections.php', data, 'POST');
/**
 * 管理员修改开课信息
 */
export const putSectionInfo = data => fetch('/admins/sections/update.php', data, 'POST');
/**
 * 管理员删除开课信息
 */
export const deleteSectionInfo = data => fetch('/admins/sections/delete.php', data);
/**
 * 管理员获取开课信息
 */
export const getSectionInfo = data => fetch('/admins/sections.php', data);


/**
 * 管理员设置开课时间
 */
export const setTime = data => fetch('/admins/time.php', data, 'POST')


/**
 * 学生获取已选、未选课程， 或详细信息
 */
export const getCourses = data => fetch('/students/courses.php', data);

/**
 * 选课退课
 */
export const chooseCourse = data => fetch('/students/courses.php', data, 'POST');

/**
 * 选课申请
 */
export const applyCourse = data => fetch('/students/courses/application.php', data, 'POST');
/**
 * 查看成绩
 */
export const getGrades = data => fetch('/students/courses/grade.php', data, 'GET');
/**
 * 查看选课申请
 */
export const getApplication = data => fetch('/students/courses/application.php', data, 'GET');



/**
 * 教师
 */


/**
 * 获取所教课程
 */
export const getAllTeach = () => fetch('/teachers/courses.php');

/**
 * 查看学生名单
 */
export const getStudentList = data => fetch('/teachers/students.php', data);

/**
 * 查看选课申请
 */
export const getApplyFromStudent = () => fetch('/teachers/applications.php');

/**
 * 处理选课申请
 */
export const handleApply = data => fetch('/teachers/applications.php', data, 'POST');

/**
 * 手动登分
 */
export const uploadByhand = data => fetch('/teachers/grade.php', data, 'POST');


/**
 * 选课时间
 */
export const getTime = () => fetch('/admins/time.php')