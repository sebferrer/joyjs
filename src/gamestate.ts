import { Point } from "./point";
import { Joystick } from "./joystick";

export class GameState {
	public joysticks: Joystick[];
	public touches: TouchList;

	constructor() {
		this.joysticks = new Array<Joystick>();

		document.ontouchstart = event => this.touch_start(event.touches);
		document.ontouchend = event => this.touch_end();
		document.ontouchmove = event => { this.touches = event.touches; };
	}

	public touch_start(touches): void {
		this.touches = touches;
		this.joysticks.push(new Joystick(	new Point(touches[touches.length-1].pageX, touches[touches.length-1].pageY), 40,
											new Point(touches[touches.length-1].pageX, touches[touches.length-1].pageY), 20));
	}

	public touch_end(): void {
		if (this.joysticks != null) {
			this.joysticks.forEach(joystick => {
				joystick.div_zone.remove();
				joystick.div_controller.remove();
			});
			this.joysticks.splice(0, this.joysticks.length);
		} else {
			this.joysticks = new Array<Joystick>();
		}
	}

	public touch_move(): void {
		if (this.joysticks.length > 0) {
			for(let i = 0; i < this.joysticks.length; i++) {
				this.joysticks[i].move(this.touches[i].pageX, this.touches[i].pageY);
			}
		}
	}

	public update(): void {
		this.touch_move();

		const self = this;
		window.requestAnimationFrame(() => self.update());
	}
}