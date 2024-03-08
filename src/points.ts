import Balls from "./balls";
import Spawner from "./spawner";

class Points {
    public points: number = 0;

    getPoints(): void {
        const balls: Balls = new Balls();
        const spawner: Spawner = new Spawner();

        const all_fields: HTMLElement[][] = spawner.getFullMap();
        const all_balls: HTMLElement[] = balls.getAllBalls();
        const winning_line: number = 5;
        const to_remove: HTMLElement[] = [];

        const checkLine = (i: number, j: number, di: number, dj: number): boolean => {
            const first_ball: any = all_fields[i][j].childNodes[0];
            let counter: number = 0;

            while (
                all_fields[i + counter * di] &&
                all_fields[i + counter * di][j + counter * dj] &&
                all_balls.includes(all_fields[i + counter * di][j + counter * dj])
            ) {
                const color_check: any = all_fields[i + counter * di][j + counter * dj].childNodes[0];

                if (first_ball.style.backgroundColor == color_check.style.backgroundColor) {
                    counter++;

                    if (counter >= winning_line) {
                        for (let x: number = 0; x < counter; x++) {
                            const row: number = i + x * di;
                            const col: number = j + x * dj;

                            if (!to_remove.includes(all_fields[row][col])) {
                                to_remove.push(all_fields[row][col]);
                            }
                        }
                    }
                } else {
                    break;
                }
            }

            return counter >= winning_line;
        };

        for (let i: number = 0; i < all_fields.length; i++) {
            for (let j: number = 0; j < all_fields[i].length; j++) {
                if (all_balls.includes(all_fields[i][j])) {
                    if (checkLine(i, j, 0, 1) || checkLine(i, j, 1, 0) || checkLine(i, j, 1, 1) || checkLine(i, j, 1, -1)) {
                        break;
                    }
                }
            }
        }

        if (to_remove.length >= winning_line) {
            for (let t: number = 0; t < to_remove.length; t++) {
                const index: number = all_balls.indexOf(to_remove[t]);
                if (index !== -1) {
                    all_balls.splice(index, 1);
                }

                try {
                    const ballElement = to_remove[t].querySelector('.ball');
                    if (ballElement) {
                        ballElement.classList.add('pop-out');
                        setTimeout(() => {
                            to_remove[t].removeChild(ballElement);
                        }, 200);
                    }
                } catch (e) {
                    console.error("Error removing ball element:", e);
                }
            }
            this.points += to_remove.length;

            const pointHolder: HTMLElement = document.querySelector("#points");
            if (pointHolder) {
                pointHolder.innerHTML = this.points.toString();
            }
        }
    }
}

export default Points;
