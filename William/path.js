function moveTowardsBridge(char) {
    if (char.isDragged) return

    let bridge1X = 1 * tileSize + tileSize / 2
    let bridge2X = 8 * tileSize + tileSize / 2
    let targetX = (Math.abs(char.x - bridge1X) < Math.abs(char.x - bridge2X)) ? bridge1X : bridge2X
    let targetY = 5 * tileSize + tileSize / 2

    let tower1X = 1 * tileSize + tileSize / 2
    let tower2X = 8 * tileSize + tileSize / 2
    let towerY  = 1 * tileSize + tileSize / 2
    let enemyTowerX = (Math.abs(char.x - tower1X) < Math.abs(char.x - tower2X)) ? tower1X : tower2X

    if (char.y > targetY) {
        let dx = targetX - char.x
        let dy = targetY - char.y
        let dist = Math.hypot(dx, dy)
        let stepX = (dx / dist) * char.speed
        let stepY = (dy / dist) * char.speed

        char.x += stepX
        char.y += stepY

        if (checkKollision(char)) {
            char.x -= stepX
            char.y -= stepY

            char.x += stepX
            if (checkKollision(char)) char.x -= stepX

            char.y += stepY
            if (checkKollision(char)) char.y -= stepY
        }
    } else if (char.y > towerY) {
        let dx = enemyTowerX - char.x
        let dy = towerY - char.y
        let dist = Math.hypot(dx, dy)
        let stepX = (dx / dist) * char.speed
        let stepY = (dy / dist) * char.speed

        char.x += stepX
        char.y += stepY

        if (checkKollision(char)) {
            char.x -= stepX
            char.y -= stepY

            char.x += stepX
            if (checkKollision(char)) char.x -= stepX

            char.y += stepY
            if (checkKollision(char)) char.y -= stepY
        }
    }
}

function moveEnemyTowardsBridge(char) {
    let bridge1X = 1 * tileSize + tileSize / 2
    let bridge2X = 8 * tileSize + tileSize / 2
    let targetX = (Math.abs(char.x - bridge1X) < Math.abs(char.x - bridge2X)) ? bridge1X : bridge2X
    let targetY = 4 * tileSize + tileSize / 2 

    let tower1X = 1 * tileSize + tileSize / 2
    let tower2X = 8 * tileSize + tileSize / 2
    let towerY  = 8 * tileSize + tileSize / 2 
    let playerTowerX = (Math.abs(char.x - tower1X) < Math.abs(char.x - tower2X)) ? tower1X : tower2X

    if (char.y < targetY) {
        let dx = targetX - char.x
        let dy = targetY - char.y
        let dist = Math.hypot(dx, dy)
        let stepX = (dx / dist) * char.speed
        let stepY = (dy / dist) * char.speed

        char.x += stepX
        char.y += stepY

        if (checkKollision(char)) {
            char.x -= stepX
            char.y -= stepY

            char.x += stepX
            if (checkKollision(char)) char.x -= stepX

            char.y += stepY
            if (checkKollision(char)) char.y -= stepY
        }
    } else if (char.y < towerY) {
        let dx = playerTowerX - char.x
        let dy = towerY - char.y
        let dist = Math.hypot(dx, dy)
        let stepX = (dx / dist) * char.speed
        let stepY = (dy / dist) * char.speed

        char.x += stepX
        char.y += stepY

        if (checkKollision(char)) {
            char.x -= stepX
            char.y -= stepY

            char.x += stepX
            if (checkKollision(char)) char.x -= stepX

            char.y += stepY
            if (checkKollision(char)) char.y -= stepY
        }
    }
}