const maxLikes = (blogs) => {
    const array = blogs.map(e => e.likes)
    const index = array.indexOf(Math.max(...array))
    return blogs[index]
}



module.exports =  maxLikes