const _ = require('lodash')
const mostBlogs = (blogs) => {
    const authors = blogs.map(e => e.author)
    const lod_arr = _.countBy(authors)

   return Object.entries(lod_arr).reduce((a, b) => a > b ? a : b)
}

module.exports = mostBlogs