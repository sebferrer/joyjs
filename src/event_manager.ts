import { Point } from "./point";
import { Joystick } from "./joystick";
import { EventType } from "./event_type";
import { window_W } from "./main";
import { ArrayUtil } from "./util";
import { TouchHelper } from "./touch_helper";

export class EventManager {
	public joysticks: Joystick[];
	public touches: TouchList;
	public mouse_pos: Point;
	public event_type: EventType;
	public log: boolean;

	constructor(event_type: EventType) {
		this.joysticks = new Array<Joystick>();
		this.mouse_pos = new Point();
		this.event_type = event_type;
		this.log = true;

		document.onmousedown = event => this.mouse_down(event.offsetX, event.offsetY);
		document.onmouseup = event => this.mouse_up();
		document.onmousemove = event => { this.mouse_pos.x = event.offsetX; this.mouse_pos.y = event.offsetY; };

		document.ontouchstart = event => this.touch_start(event.touches);
		document.ontouchend = event => this.touch_end(event.touches);
		document.ontouchmove = event => { this.touches = event.touches; };

		document.getElementById("log-check").onchange = event => { this.change_log(); };
	}

	public touch_start(touches): void {
		const touches_array = TouchHelper.touchlist_to_id_array(this.touches);
		const new_touches_array = TouchHelper.touchlist_to_id_array(touches);
		const new_touch = TouchHelper.get_touch_by_identifier(touches, ArrayUtil.diff(new_touches_array, touches_array)[0]);
		
		this.touches = touches;
		const touch_x = new_touch.pageX;
		const touch_y = new_touch.pageY;
		if (touch_x < (window_W / 2)) {
			this.joysticks.push(new Joystick("joyjs-"+new_touch.identifier, new Point(touch_x, touch_y), 40,
				new Point(touch_x, touch_y), 20, new_touch.identifier));
		}
		else {
			this.joysticks.push(new Joystick("joyjs-"+new_touch.identifier, new Point(touch_x, touch_y), 40,
				new Point(touch_x, touch_y), 20, new_touch.identifier));
		}
	}

	public touch_end(touches): void {
		const touches_array = TouchHelper.touchlist_to_id_array(this.touches);
		const new_touches_array = TouchHelper.touchlist_to_id_array(touches);
		const touches_removed = ArrayUtil.diff(touches_array, new_touches_array);

		const joysticks_to_remove = new Array<Joystick>();

		touches_removed.forEach(touch_identifier => {
			const joystick_to_remove = this.joysticks.find(joystick => joystick.touch_identifier === touch_identifier);
			if(joystick_to_remove != null) {
				joysticks_to_remove.push(joystick_to_remove);
			}
		});

		this.touches = touches;

		joysticks_to_remove.forEach(joystick => {
			joystick.div_zone.remove();
			joystick.div_controller.remove();
			ArrayUtil.remove_from_array(this.joysticks, joystick);
			if(this.log) {
				joystick.div_log.remove();
			}
		});
	}

	public touch_move(): void {
		if (this.joysticks.length > 0) {
			for (let i = 0; i < this.joysticks.length; i++) {
				const joystick = this.joysticks[i];
				const touch = TouchHelper.get_touch_by_identifier(this.touches, joystick.touch_identifier);
				if(touch != null) {
					joystick.move(touch.pageX, touch.pageY);
				}
			}
		}
	}

	public mouse_down(x: number, y: number): void {
		this.joysticks.push(new Joystick(	"mouse", new Point(x, y), 40,
											new Point(x, y), 20));
	}

	public mouse_up(): void {
		if (this.joysticks != null) {
			this.joysticks[0].div_zone.remove();
			this.joysticks[0].div_controller.remove();
			if(this.log) {
				this.joysticks[0].div_log.remove();
			}
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

		if(this.log) {
			if (this.joysticks.length > 0) {
				for(let i = 0; i < this.joysticks.length; i++) {
					this.joysticks[i].div_log.innerHTML =	"Joystick "+(i+1)+":"+
															"<br/>x: "+this.joysticks[i].coeff_x+
															"<br/>y: "+this.joysticks[i].coeff_y;
				}
			}
		}

		const self = this;
		window.requestAnimationFrame(() => self.update());
	}

	public change_log(): void {
		this.log = this.log ? false : true;
	}
}