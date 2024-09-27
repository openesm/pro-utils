import { isArray } from 'lodash-es';
import { isBoolean } from 'lodash-es';
import { isDate } from 'lodash-es';
import { isEmpty } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { isNull } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { isObject } from 'lodash-es';
import { isRegExp } from 'lodash-es';
import { isString } from 'lodash-es';
import { isUndefined } from 'lodash-es';
import { upperFirst } from 'lodash-es';

declare namespace arr {
    export {
        set,
        del,
        delBy,
        replace,
        replacex,
        getIndexByKey,
        at,
        sortBy,
        compareBy,
        count,
        countBy
    }
}
export { arr }

/** 通过下标取得数组，允许负数 */
declare function at<T>(list: T[], index: number): T | undefined;

/** 中文字符串排序数组 */
declare function compareBy<T>(list: T[], ...keys: (keyof T)[]): void;

/**
 * v24.03.08
 * 统计数字列表
 */
declare function count(list: number[]): number;

/**
 * v24.03.08
 * 指定key，统计数量
 */
declare function countBy<T extends Record<string, any>>(list: T[], getKey: keyof T | ((item: T) => number)): number;

/** 删除数组项 */
declare function del<T>(list: T[], data: T, ...keys: (keyof T)[]): boolean;

/** 通过函数返回值删除列表项 */
declare function delBy<T>(list: T[], fn: ((item: T) => boolean)): void;

declare namespace dt {
    export {
        format,
        formatWithTz,
        getDay,
        getMonth,
        getYear,
        getToday,
        toDate,
        newDate,
        prevDate,
        nextDate,
        getWeekday,
        getWeekName,
        firstDateOfWeek,
        lastDateOfWeek,
        getWeekNumberOfYear,
        firstDateOfMonth,
        lastDateOfMonth,
        prevMonthSameDate,
        nextMonthSameDate,
        getMonthDays,
        getDiffDays,
        getRelativeTime,
        WEEK_DAYS,
        FORMAT_DEFAULT,
        INVALID_DATE_STRING,
        isValid,
        getFirstDayOfMonth
    }
}
export { dt }

/** 月的第一天 */
declare function firstDateOfMonth(date: string | number | Date): string;

/** 周的第一天 */
declare function firstDateOfWeek(date: string | number | Date): string;

/**
 *  日期格式化
 *  ----------------------------------------------------------
 *  占位符 | 输出             | 详情                     |
 *  :-     |  -:              | -:                       |
 *  YY     | 18               | 两位数的年份             |
 *  YYYY   | 2018             | 四位数的年份             |
 *  M      | 1-12             | 月份, 从 1 开始          |
 *  MM     | 01-12            |  月份, 两位数            |
 *  MMM    | Jan-Dec          | 缩写的月份名称           |
 *  MMMM   | January-December | 完整的月份名称           |
 *  D      | 1-31             | 月份里的一天             |
 *  DD     | 01-31            | 月份里的一天, 两位数     |
 *  d      | 0-6              | 一周中的一天, 星期天是 0 |
 *  dd     | Su-Sa            | 最简写的星期几           |
 *  ddd    | Sun-Sat          | 简写的星期几             |
 *  dddd   | Sunday-Saturday  | 星期几                   |
 *  H      | 0-23             | 小时                     |
 *  HH     | 00-23            | 小时, 两位数             |
 *  h      | 1-12             | 小时, 12 小时制          |
 *  hh     | 01-12            | 小时, 12 小时制, 两位数  |
 *  m      | 0-59             | 分钟                     |
 *  mm     | 00-59            | 分钟, 两位数             |
 *  s      | 0-59             | 秒                       |
 *  ss     | 00-59            | 秒, 两位数               |
 *  SSS    | 000-999          | 毫秒, 三位数             |
 *  Z      | +05:00           | UTC 的偏移量, ±HH:mm     |
 *  ZZ     | +05:00           | UTC 的偏移量, ±HH:mm     |
 *  A      | AM，PM           |                          |
 *  a      | am, pm           |                          |
 */
declare function format(date: string | number | Date, format?: string): string;

declare const FORMAT_DEFAULT = "YYYY-MM-DD";

declare function formatWithTz(date: string | number | Date, tz?: string, format?: string): string;

declare function getDay(date: string | number | Date): number;

/**
 * 获取起始日期与结束日期的天数和
 *
 * 示例:
 * ```javascript
 * dt.getDiffDays('2022-08-27', '2022-08-28') => 1
 * ```
 */
declare function getDiffDays(start_date: string | number | Date, end_date: string | number | Date): number;

/** 获取月份第一天星期几 */
declare const getFirstDayOfMonth: (date: Date) => number;

/** 获取指定 key 项下标 */
declare function getIndexByKey<T>(list: T[], data: T, ...keys: (keyof T)[]): number;

/** 获取月 */
declare function getMonth(date: string | number | Date): number;

/** 获得指定月的天数 */
declare function getMonthDays(y: number, m: number): number;

/** 取得相对时间 */
declare function getRelativeTime(date: string | number | Date): string;

/** 获取今天的日期 */
declare function getToday(): string;

/**  返回星期几的数字, 星期日默认返回 7  */
declare function getWeekday(date: string | number | Date, sunday_number?: number): number;

/**  返回星期几中文标识 */
declare function getWeekName(date: string | number | Date): string;

/** 获取当前周为一年的第几周 */
declare function getWeekNumberOfYear(date: Date): number | null;

/** 获取年 */
declare function getYear(date: string | number | Date): number;

/**
 * 生成 cdn 图片的 `query` 参数
 * v24.01.11
 *
 * @param size 图片大小
 * @param position 图片位置
 * @param format 图片格式
 */
export declare const imgMore2: (size: number, position?: string, format?: string) => string;

declare const INVALID_DATE_STRING = "Invalid Date";

declare namespace is {
    export {
        is_2 as is,
        isNullOrUnDef,
        isPromise,
        isAbsolutePath,
        isUrl,
        isBase64,
        isEmail,
        isExternal,
        isIdCard,
        isMobileNumber,
        isString,
        isNumber,
        isBoolean,
        isUndefined,
        isNull,
        isObject,
        isArray,
        isEmpty,
        isFunction,
        isDate,
        isRegExp
    }
}
export { is }

/** 判断数据类型 */
declare function is_2(val: unknown, type: string): boolean;

/** 检查是否路径是否为绝对路径格式 */
export declare function isAbsolutePath(val: string): boolean;

export { isArray }

/** 检查是否为 Base64 格式 */
export declare function isBase64(val: unknown): boolean;

export { isBoolean }

export { isDate }

/** 是否为邮箱 */
export declare function isEmail(val: string): boolean;

export { isEmpty }

/** 检查是否为外链 */
export declare function isExternal(path: string): boolean;

export { isFunction }

/** 是否为身份证号码 */
export declare function isIdCard(val: string | number): boolean;

/**
 * 是否为手机号
 *
 * 最新手机号验证正则表达式
 * https://blog.csdn.net/weixin_48077282/article/details/126267641
 */
export declare function isMobileNumber(val: string | number): boolean;

export { isNull }

/** 是否为字符串 */
/** 是否为数字 */
/** 是否为布尔值 */
/** 是否为 undefined */
/** 是否为 null */
/** 是否为 null or undefined */
export declare function isNullOrUnDef(val: unknown): val is null | undefined;

export { isNumber }

export { isObject }

/** 是否为对象 */
/** 是否为数组 */
/** 是否为空 */
/** 是否为函数 */
/** 是否日期对象 */
/** 是否为正则 */
/** 是否 Promise 函数 */
export declare function isPromise<T = any>(val: unknown): val is Promise<T>;

export { isRegExp }

export { isString }

export { isUndefined }

/** 是否为网址 */
export declare function isUrl(path: string): boolean;

/** 是否有效日期 */
declare const isValid: (date: string | number | Date) => boolean;

/** 月的最后一天 */
declare function lastDateOfMonth(date: string | number | Date): string;

/** 周的最后一天 */
declare function lastDateOfWeek(date: string | number | Date): string;

/** 根据年月日创建新日期 */
declare function newDate(y: number, m: number, d: number): string;

/** 下日 (可后退多日) */
declare function nextDate(date: string | number | Date, amount?: number): string;

/** 下月同日 */
declare function nextMonthSameDate(date: string | number | Date): string;

/** 上日 (可前进多日) */
declare function prevDate(date: string | number | Date, amount?: number): string;

/** 上月同日 */
declare function prevMonthSameDate(date: string | number | Date): string;

/** 替换数组项 */
declare function replace<T>(list: T[], data: T, ...keys: (keyof T)[]): void;

/** 替换数组项 */
declare function replacex<T>(list: T[], data: T, ...keys: (keyof T)[]): void;

/** 替换数组项 */
declare function set<T>(list: T[], data: T, key: keyof T): boolean;

export declare function sleep(time: number, key?: string): Promise<unknown>;

/** 数组指定 key 排序 */
declare function sortBy<T>(list: T[], ...keys: (keyof T)[]): void;

declare namespace str {
    export {
        upperFirst
    }
}
export { str }

/** 转换为 Date 对象 */
declare function toDate(date: string | number | Date): Date | null;

/**
 * 日期操作函数
 * v24.01.11
 */
declare const WEEK_DAYS: string[];

export { }
