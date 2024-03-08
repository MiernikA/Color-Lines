import Balls from "./balls";
import ShortestPath from "./shortest_path";
import Points from "./points";

const full_map: HTMLElement[][] = []
let timer_controller: NodeJS.Timeout

class Spawner {

    public size: number = 9;

    startGame(): void {
        let is_selected: boolean = false
        let path_preview: boolean = false;
        const selected_fields: HTMLElement[] = []

        const balls: Balls = new Balls
        const shortest_path: ShortestPath = new ShortestPath
        const points: Points = new Points

        const all_balls: HTMLElement[] = balls.getAllBalls()

        timer_controller = setInterval(function () {
            balls.startTimer()
        }, 1000)

        for (let i: number = 0; i < this.size; i++) {
            full_map[i] = []
            for (let j: number = 0; j < this.size; j++) {
                let field: HTMLElement = document.createElement('div');
                field.className = 'field'
                field.id = ((i * this.size) + j).toString()

                document.querySelector('#stage').append(field)
                full_map[i][j] = field

                field.onmousemove = (): void => {
                    if (path_preview == true && field.children.length == 0 && is_selected == true) {
                        let path: HTMLElement[] = shortest_path.find_path(selected_fields[selected_fields.length - 1], field)
                        if (path !== undefined) {
                            path.forEach(element => {
                                element.style.backgroundColor = '#D3D3D3'
                                for (let k: number = 0; k < this.size * this.size; k++) {
                                    if (path.indexOf(document.getElementById(k.toString())) < 0) {
                                        document.getElementById(k.toString()).style.backgroundColor = '#afafaf'
                                    }
                                }
                            });
                        }
                    }
                }

                field.onclick = (): void => {
                    path_preview = true;

                    if (field.children.length == 1 && (field.children[0] as HTMLElement).style.border == '2px solid rgb(0, 0, 0)') {
                        path_preview = false;
                        is_selected = false;
                        (field.children[0] as HTMLElement).style.border = 'none';
                        full_map.forEach(element => {
                            element.forEach(el => {
                                el.style.background = "#afafaf"
                            })
                        })

                    }

                    else if (field.children.length == 1) {

                        all_balls.forEach(element => {
                            (element.children[0] as HTMLElement).style.border = "none"
                        })
                        full_map.forEach(element => {
                            element.forEach(el => {
                                el.style.background = "#afafaf"
                            })
                        })
                        let check = balls.isPossibleToPick(field);
                        (field.children[0] as HTMLElement).style.border = '2px solid #000000'
                        if (check == false) return;
                        else {
                            if (field.style.backgroundColor == '#D3D3D3') {
                                for (let x: number = 0; x < this.size * this.size; x++) {
                                    document.getElementById(x.toString()).style.backgroundColor = '#afafaf'
                                }
                                field.style.backgroundColor = '#afafaf'
                                is_selected = false
                            }
                            else if (is_selected == false) {
                                is_selected = true
                                field.style.backgroundColor = '#D3D3D3'
                            }
                            else {
                                selected_fields[selected_fields.length - 1].style.backgroundColor = '#afafaf'
                                selected_fields.pop()
                                field.style.backgroundColor = '#D3D3D3'
                            }
                            selected_fields.push(field)
                        }
                    }

                    else if (field.children.length == 0 && is_selected == true) {

                        let path: HTMLElement[] = shortest_path.find_path(selected_fields[selected_fields.length - 1], field);
                        (path[0].children[0] as HTMLElement).style.border = 'none'
                        if (path !== undefined) {
                            for (let y: number = 0; y < all_balls.length; y++) {
                                if (all_balls[y] == selected_fields[selected_fields.length - 1]) {
                                    all_balls.splice(y, 1)
                                }
                            }
                            let start = selected_fields[selected_fields.length - 1]
                            all_balls.push(field)

                            setTimeout(() => {

                                field.appendChild(start.childNodes[0])

                                is_selected = false
                                balls.draw_colors()
                                path.forEach(element => {
                                    element.style.backgroundColor = '#d3d3d3'
                                    let clear: any = setInterval(function () {
                                        element.style.backgroundColor = '#afafaf'
                                        clearInterval(clear)
                                    }, 500);
                                });
                                points.getPoints()
                            }, 2);
                        }
                    }
                }
            }
        }
        balls.draw_colors()
    }

    getFullMap(): HTMLElement[][] {
        return full_map;
    }

    getTimerController(): NodeJS.Timeout {
        return timer_controller;
    }
}

export default Spawner
