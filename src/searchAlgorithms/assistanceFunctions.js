
const getNeighbours = (idx, rowLength, colLength) => {
    const [row, col] = idx.split(",").map(Number);
    let neighbours = [
        ...((row - 1 >= 0 && row - 1 < rowLength) ? [`${row - 1},${col}`] : []),
        ...((col + 1 >= 0 && col + 1 < colLength) ? [`${row},${col + 1}`] : []),
        ...((row + 1 >= 0 && row + 1 < rowLength) ? [`${row + 1},${col}`] : []),
        ...((col - 1 >= 0 && col - 1 < colLength) ? [`${row},${col - 1}`] : []),
    ];
    return neighbours;
}

const processAndFindNode = (current, arrayOfNodes, visited, { board, goalIdx, rowNumber, colNumber }) => {
    board[current].setStatus('visited');
    const neighbours = getNeighbours(current, rowNumber, colNumber);
    for (let neighbour of neighbours) {
        if (!(neighbour in visited)) {
            visited[neighbour] = current;
            arrayOfNodes.push(neighbour);
        }
    }
    // Found the Goal ***
    if (current === goalIdx) {
        board[current].setStatus('found')
        arrayOfNodes.length = 0
    }
}


const showPath = async (board, visited, goalIdx) => {
    let previousNode = visited[goalIdx]
    let path = []
    while (previousNode) {
        path.push(previousNode)
        previousNode = visited[previousNode]
    }
    path.pop();  //pop the first of the path, which is the start node 
    while (path.length > 0) {
        const current = path.pop();
        board[`${current}`].setStatus('path')
        await new Promise(r => setTimeout(r, 100));
    }
    return path
}

export {getNeighbours, processAndFindNode, showPath}