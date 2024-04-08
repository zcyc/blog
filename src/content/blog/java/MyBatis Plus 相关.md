---
title: "MyBatis Plus 相关"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "mybatis-plus"
pubDatetime: 2020-11-13T13:55:03.000+08:00
modDatetime: 2021-06-26T10:32:57.000+08:00
featured: false
draft: false
---

```java
// 除了日期相关的，实现类这么写，可以这么查
public Student getByCardUid(String cardUid) {
        Student student = new Student();
        student.setCardUid(cardUid);
        return baseMapper.selectOne(new QueryWrapper<>(student));
}
// 也可以是这样
public AttendanceLog getByAttendanceTaskIdAndCardUid(String attendanceTaskId, String cardUid) {
        QueryWrapper<AttendanceLog> attendanceLogQueryWrapper = new QueryWrapper<AttendanceLog>()
                .eq("attendance_task_id", attendanceTaskId)
        return baseMapper.selectOne(attendanceLogQueryWrapper);

// 判断两个条件可以这样
public AttendanceLog getByAttendanceTaskIdAndCardUid(String attendanceTaskId, String cardUid) {
        QueryWrapper<AttendanceLog> attendanceLogQueryWrapper = new QueryWrapper<AttendanceLog>()
                .eq("attendance_task_id", attendanceTaskId)
                .eq("card_uid", cardUid);
        return baseMapper.selectOne(attendanceLogQueryWrapper);
}
// 如果是判断时间区间，就得这样
public AttendanceTask getByAttendanceMachineIdAndTime(String attendanceMachineId) {
        Instant instant = Instant.now();
        QueryWrapper<AttendanceTask> attendanceTaskQueryWrapper = new QueryWrapper<AttendanceTask>()
                .eq("attendance_machine_id", attendanceMachineId)
                .between("task_start_time", "task_end_time", instant);
        return baseMapper.selectOne(attendanceTaskQueryWrapper);
}

//如果一个表启用了多租户，但是个别函数不需要自动拼接多租户条件。那么就在mapper的函数上边加一个注解。
//注意是加在mapper文件中的查询函数上。
@InterceptorIgnore(tenantLine = "true")
//旧版本的 mybatis plus 分页和多租户条件是分开的，所以是下面这种写法。
@SqlParser(filter=true)

```
