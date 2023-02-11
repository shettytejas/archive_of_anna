// TODO: Open an inteface for getting download progress that's using download-helper. https://github.com/jhereu/node-global-storage

// module.exports = () => {
//   const progress = {};

//   return {
//     setProgress: (name, progressEvent) => {
//       const percent = (progressEvent.loaded * 100) / progressEvent.total;
//       progress[name] = Math.round(percent);
//     },

//     getProgress: (name) => {
//       return progress[name];
//     },
//   };
// };
