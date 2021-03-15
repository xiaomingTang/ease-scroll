/**
 * 返回一个位于 min ~ max 之间的整数
 * @param _min 最小值 应当是整数(即使不是整数, 也会通过 Math.ceil 转为整数)
 * @param _max 最大值 应当是整数(即使不是整数, 也会通过 Math.floor 转为整数))
 * @param filterTails 是否去除首尾
 */
export declare function randomInt(_min: number, _max: number, filterTails?: boolean): number;
/**
 * 从给定参数中随机挑选一个值, 并返回该值
 */
export declare function randomPick<T>(...args: T[]): T;
export declare function clamp(val: number, min: number, max: number): number;
