/**
 * Created by WuZeHua on 2021/01/10.
 */

/**
 * username valid or not
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsernameUtil(str) {
    let len = str.length;
    if(len >= 3 && len <= 20) {
        return true;
    } else {
        return false;
    }
}

/**
 * E-mail valid or not
 * @param {string} str
 * @returns {Boolean}
 */
export function validEmailUtil(str) {
    let len = str.length;
    if(len >= 3 && len <= 20) {
        return true;
    } else {
        return false;
    }
}