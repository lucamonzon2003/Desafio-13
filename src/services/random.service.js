const randomFunc = (cant) => {
    const result = {}
for(let i = 0; i<cant; i++) {
        const newN = Math.floor(Math.random() * 1000 + 1)
    result[newN] = !result[newN] ? 1 : result[newN] + 1
    }
    return result
}

process.on('message', (cant) => {
    process.send(randomFunc(cant))
})