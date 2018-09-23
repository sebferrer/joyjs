import { Point } from "./point";
import { Joystick } from "./joystick";
import { EventType } from "./event_type";

export class EventManager {
	public joysticks: Joystick[];
	public touches: TouchList;
	public mouse_pos: Point;
	public event_type: EventType;

	constructor(event_type: EventType) {
		this.joysticks = new Array<Joystick>();
		this.mouse_pos = new Point();
		this.event_type = event_type;

		document.onmousedown = event => this.mouse_down(event.offsetX, event.offsetY);
		document.onmouseup = event => this.mouse_up();
		document.onmousemove = event => { this.mouse_pos.x = event.offsetX; this.mouse_pos.y = event.offsetY; };

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

	public mouse_down(x: number, y: number): void {
		this.joysticks.push(new Joystick(	new Point(x, y), 40,
											new Point(x, y), 20));
	}

	public mouse_up(): void {
		if (this.joysticks != null) {
			this.joysticks[0].div_zone.remove();
			this.joysticks[0].div_controller.remove();
			this.joysticks.splice(0, this.joysticks.length);
		} else {
			this.joysticks = new Array<Joystick>();
		}
	}

	public mouse_move(): void {
		if (this.joysticks.length > 0) {
			this.joysticks[0].move(this.mouse_pos.x, this.mouse_pos.y);
		}
	}

	public update(): void {
		switch(this.event_type) {
			case EventType.TOUCH:
				this.touch_move();
				break;
			case EventType.MOUSE:
				this.mouse_move();
				break;
		}

		const self = this;
		window.requestAnimationFrame(() => self.update());
	}
}