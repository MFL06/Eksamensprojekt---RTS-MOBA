function checkKollision(char) {
    let radius = char.r / 2
    let smallRadius = char.r / 4  // Mindre radius ved egne tårne
 
    let points = [
        { x: char.x + radius, y: char.y },  // højre
        { x: char.x - radius, y: char.y },  // venstre
        { x: char.x, y: char.y + radius },  // bund
        { x: char.x, y: char.y - radius },  // top
    ]
 
    for (let p of points) {
        let r = Math.floor(p.y / tileSize)
        let c = Math.floor(p.x / tileSize)
        if (r < 0 || r >= rows || c < 0 || c >= cols) continue
        let tile = map[r][c]
 
        // Brug lille radius ved egne tårne
        if (tile.tower && r == 8) {
            let r = Math.floor(char.y / tileSize)
            let c = Math.floor(char.x / tileSize)
            let towerX = c * tileSize + tileSize / 2
            let towerY = r * tileSize + tileSize / 2
            let dist = Math.hypot(char.x - towerX, char.y - towerY)
            if (dist > smallRadius + tileSize / 2) continue
        }
 
        if (!tile.walkable) return true
    }
    return false
}
 