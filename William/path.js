function moveTowardsBridge(char) {
    if (char.isDragged) return
 
    let bridge1X = 1 * tileSize + tileSize / 2
    let bridge2X = 8 * tileSize + tileSize / 2
    let targetX = (Math.abs(char.x - bridge1X) < Math.abs(char.x - bridge2X)) ? bridge1X : bridge2X
    let targetY = 5 * tileSize + tileSize / 2  // Det første grå felt (r=5)
 
    if (char.y > targetY) {
        // Gå diagonalt mod broen
        let dx = targetX - char.x
        let dy = targetY - char.y
        let dist = Math.hypot(dx, dy)
        char.x += (dx / dist) * 2
        char.y += (dy / dist) * 2
    } else {
        // Broen nået – gå lige op
        char.x = targetX
        char.y -= 2
    }
}
