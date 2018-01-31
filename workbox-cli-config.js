module.exports = {
  "globDirectory": "./dist/",
  "globPatterns": [
    "**/*.html",
    "**/*.js",
    "**/*.css",
    "**/*.png",
    'static/'
  ],
  "globIgnores": ['sw.js', 'service-worker.js'],
  "swSrc": "./src/sw.js",
  "swDest": "./dist/service-worker.js"
}
