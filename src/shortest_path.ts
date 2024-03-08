import Spawner from "./spawner"
import Balls from "./balls"

//BFS


class ShortestPath {

    find_path(start: HTMLElement, cel: HTMLElement): HTMLElement[] {

        const spawner: Spawner = new Spawner
        const balls: Balls = new Balls

        const all_balls: HTMLElement[] = balls.getAllBalls()
        const all_fields: HTMLElement[][] = spawner.getFullMap()

        const queue: HTMLElement[] = []
        const parent: any = {}
        const path: HTMLElement[] = []

        queue.push(start)

        let visited: any = {}
        visited[start.id] = true

        parent[start.id] = -1

        while (queue.length > 0) {
            let first: HTMLElement = queue.shift()
            const neighbors: HTMLElement[] = this.checkNeighbors(first, all_fields)

            if (first.id == cel.id) {
                return path;
            }

            for (let i: number = 0; i < neighbors.length; i++) {

                if (all_balls.indexOf(neighbors[i]) !== -1) {
                    continue;
                }

                if (visited[neighbors[i].id] == undefined) {

                    visited[neighbors[i].id] = true

                    if (neighbors[i].id == cel.id) {

                        path.push(neighbors[i])

                        while (first.id !== start.id) {
                            path.push(first)
                            first = parent[first.id]
                        }
                        path.push(first)
                        path.reverse()
                        return path;
                    }

                    parent[neighbors[i].id] = first
                    queue.push(neighbors[i])

                }

            }
        }
    }
    checkNeighbors(first: HTMLElement, all_fields: HTMLElement[][]): HTMLElement[] {

        const connections: HTMLElement[] = []

        for (let n: number = 0; n < all_fields.length; n++) {
            for (let w: number = 0; w < all_fields[n].length; w++) {

                if (all_fields[n][w] == first) {

                    if (n - 1 < 0 && w - 1 < 0) {
                        connections.push(all_fields[n + 1][w], all_fields[n][w + 1])
                    }
                    else if (n + 1 > 8 && w + 1 > 8) {
                        connections.push(all_fields[n - 1][w], all_fields[n][w - 1])
                    }
                    else if (w + 1 > 8 && n - 1 < 0) {
                        connections.push(all_fields[n + 1][w], all_fields[n][w - 1])
                    }
                    else if (w - 1 < 0 && n + 1 > 8) {
                        connections.push(all_fields[n - 1][w], all_fields[n][w + 1])
                    }
                    else if (w - 1 < 0) {
                        connections.push(all_fields[n + 1][w], all_fields[n][w + 1], all_fields[n - 1][w])
                    }
                    else if (w + 1 > 8) {
                        connections.push(all_fields[n + 1][w], all_fields[n][w - 1], all_fields[n - 1][w])
                    }
                    else if (n - 1 < 0) {
                        connections.push(all_fields[n + 1][w], all_fields[n][w - 1], all_fields[n][w + 1])
                    }
                    else if (n + 1 > 8) {
                        connections.push(all_fields[n - 1][w], all_fields[n][w - 1], all_fields[n][w + 1])
                    }
                    else {
                        connections.push(all_fields[n + 1][w], all_fields[n - 1][w], all_fields[n][w + 1], all_fields[n][w - 1])
                    }
                }
            }

        }

        return connections;

    }

}


export default ShortestPath
