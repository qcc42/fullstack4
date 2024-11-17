const _ = require('lodash')
const mostBlogs = (blogs) => {
    let sums = {}
    blogs.forEach(e=> { 
            if(!sums[e["author"]]){
                sums[e["author"]] = e.likes
            }
            else{
                sums[e["author"]] += e.likes
            }
        }
    )


return Object.entries(sums).reduce((a, b) => a[1] > b[1] ? a : b)
}

module.exports = mostBlogs