# [一周中的第几天](https://leetcode-cn.com/problems/day-of-the-week/)

## 题目描述

给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。

输入为三个整数：`day`、`month` 和 `year`，分别表示日、月、年。

您返回的结果必须是这几个值中的一个 `{"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}`。

**示例 1：**

```
输入：day = 31, month = 8, year = 2019
输出："Saturday"
```

**示例 2：**

```
输入：day = 18, month = 7, year = 1999
输出："Sunday"
```

**示例 3：**

```
输入：day = 15, month = 8, year = 1993
输出："Sunday"
```

## 解题思路

### 个人AC

```java
class Solution {
    public String dayOfTheWeek(int day, int month, int year) {
        String[] weekday = new String[]{
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"
        };
        // 从1971年1月1日开始
        int start_year = 1971;
        int total_day = 4; // 1971年1月1日是星期五
        for (int y = start_year; y < year; y++) {
            total_day += isLeapYear(y) ? 366 : 365;
        }

        int[] month_days = new int[] {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (isLeapYear(year)) {
            month_days[1] = 29; // 闰年2月有29天
        }
        for (int m = 1; m < month; m++) {
            total_day += month_days[m - 1];
        }

        total_day += day;
        
        return weekday[total_day % 7];
    }

    // 闰年是4的倍数，但不是100的倍数
    private boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
}
```

### 最优解

同上。