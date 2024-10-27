const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(e => {
        sum += e.likes
    })
    return sum
}
module.exports =  totalLikes //interesting detail, this had to be without curly brackets in order for totalLikes to be recognized as af function.