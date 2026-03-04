// pathfinding.js

// Naive pathfinder for now
function getPath(startTile, endTile, map) {
    let path = [];
    let r = startTile.row;
    let c = startTile.col;

    while (r !== endTile.row || c !== endTile.col) {
        if (r < endTile.row) r++;
        else if (r > endTile.row) r--;

        if (c < endTile.col) c++;
        else if (c > endTile.col) c--;

        path.push(map[r][c]);
    }

    return path;
}

// Later you can add A* classes or helper functions here