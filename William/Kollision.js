function checkKollision(char) {
    // Tjek alle 4 kanter af karakteren (radius r)
    let points = [
        { x: char.x + char.r, y: char.y },  // højre
        { x: char.x - char.r, y: char.y },  // venstre
        { x: char.x, y: char.y + char.r },  // bund
        { x: char.x, y: char.y - char.r },  // top
    ]
 
    for (let p of points) {
        let r = Math.floor(p.y / tileSize)
        let c = Math.floor(p.x / tileSize)
        if (r < 0 || r >= rows || c < 0 || c >= cols) continue
        if (!map[r][c].walkable) return true
    }
    return false
}
 