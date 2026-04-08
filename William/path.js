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
        let stepX = (dx / dist) * char.speed
        let stepY = (dy / dist) * char.speed

        // Prøv fuld bevægelse
        char.x += stepX
        char.y += stepY

        // Hvis kollision, rul tilbage og prøv kun X eller kun Y
        if (checkKollision(char)) {
            char.x -= stepX
            char.y -= stepY

            // Prøv kun X
            char.x += stepX
            if (checkKollision(char)) char.x -= stepX

            // Prøv kun Y
            char.y += stepY
            if (checkKollision(char)) char.y -= stepY
        }
    } else {
        // Broen nået – gå lige op
        char.x = targetX
        char.y -= char.speed

        if (checkKollision(char)) {
            char.y += char.speed
        }
    }
}