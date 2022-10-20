/**
 * HOF that handles async/await error handling
 * @param {function} fn as async function
 * @returns {function}
 */
export const catchErrors = fn => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err)
    })
  }
}

