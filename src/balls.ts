import Spawner from "./spawner"


let time: number = 0
const all_balls: HTMLElement[] = []
const upcoming_balls: number[] = []

class Balls {

    draw_colors(): void {

        const spawner: Spawner = new Spawner

        const new_balls_amount: number = 3
        const losing_line: number = 78


        const colors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#00FFFF', '#FFFF00', '#FF00FF']
        const all_fields: HTMLElement[][] = spawner.getFullMap()


        function newGame(): void {
            window.location.reload()
        }

        if (all_balls.length >= losing_line) {

            const timer_controller: NodeJS.Timeout = spawner.getTimerController()
            clearInterval(timer_controller)

            const points: string = document.querySelector("#points").innerHTML
            const time_val: string = document.querySelector('#clock').innerHTML
            const site: string = `

            <div class='interface'></div>
            <div class='winning_screen'>
                <h1>Congratulations!</h1>
                <p>You scored <b>${points}</b> points, the game lasted <b>${time_val}</b> </p>
                <button id="ng_button">Play Again!</button>
            </div>
        `
            document.body.innerHTML = site

            const new_game_button: HTMLElement = document.querySelector("#ng_button")
            new_game_button.addEventListener("click", newGame)

            return;
        }





        for (let i: number = 0; i < new_balls_amount; i++) {

            const position: HTMLElement = all_fields[Math.floor(Math.random() * spawner.size)][Math.floor(Math.random() * spawner.size)]

            if (position.children.length == 1) i -= 1

            else {
                const ball: HTMLElement = document.createElement('div')
                ball.className = 'ball'

                if (upcoming_balls.length !== 0) {

                    ball.style.backgroundColor = colors[upcoming_balls[upcoming_balls.length - 1]]
                    upcoming_balls.pop()
                }
                else {

                    ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
                }

                position.appendChild(ball)
                all_balls.push(position)
            }
        }


        upcoming_balls.push(Math.floor(Math.random() * colors.length), Math.floor(Math.random() * colors.length), Math.floor(Math.random() * colors.length))

        for (let j: number = 0; j < upcoming_balls.length; j++) {

            const id_n: string = 'n' + j.toString()
            const next_ball: HTMLElement = document.createElement('div')
            const host: HTMLElement = document.querySelector('#incoming')

            document.querySelector('#' + id_n).remove()
            next_ball.style.backgroundColor = colors[upcoming_balls[j]]
            next_ball.className = 'next_ball'
            next_ball.id = id_n
            host.appendChild(next_ball)

        }
    }


    isPossibleToPick(pole: HTMLElement): boolean {

        const spawner: Spawner = new Spawner
        const line_size: number = 8

        const all_fields: HTMLElement[][] = spawner.getFullMap()
        let possible: boolean = true

        for (let n: number = 0; n < all_fields.length; n++) {
            for (let w: number = 0; w < all_fields[n].length; w++) {
                if (all_fields[n][w] === pole) {
                    if (n - 1 < 0 && w - 1 < 0) {
                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined)
                            possible = false;
                    } else if (n + 1 > line_size && w + 1 > line_size) {
                        if (all_fields[n - 1][w].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined)
                            possible = false;
                    } else if (n - 1 < 0 && w + 1 > line_size) {
                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined)
                            possible = false;
                    } else if (w - 1 < 0 && n + 1 > line_size) {
                        if (all_fields[n - 1][w].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined)
                            possible = false;
                    } else if (w - 1 < 0) {
                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined && all_fields[n - 1][w].childNodes[0] !== undefined)
                            possible = false;
                    } else if (w + 1 > line_size) {

                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined && all_fields[n - 1][w].childNodes[0] !== undefined)
                            possible = false;
                    } else if (n - 1 < 0) {
                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined)
                            possible = false;
                    } else if (n + 1 > line_size) {
                        if (all_fields[n - 1][w].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined)
                            possible = false;
                    } else {
                        if (all_fields[n + 1][w].childNodes[0] !== undefined && all_fields[n - 1][w].childNodes[0] !== undefined && all_fields[n][w + 1].childNodes[0] !== undefined && all_fields[n][w - 1].childNodes[0] !== undefined)
                            possible = false;
                    }
                }
            }
        }
        return possible;
    }


    getAllBalls(): HTMLElement[] {
        return all_balls;
    }


    startTimer(): void {
        time++

        const minutes: number = Math.floor(time / 60)
        const seconds: number = time % 60

        const formattedMinutes: string = String(minutes).padStart(2, '0')
        const formattedSeconds: string = String(seconds).padStart(2, '0')

        document.querySelector('#clock').innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    }
}
export default Balls
