import { EventManager } from "./event_manager";
import { EventType } from "./event_type";

export const window_W = window.innerWidth;
export const window_H = window.innerHeight;

export const event_manager = new EventManager(EventType.MOUSE);

window.onload = () => {
	main();
};

function main(): void {
	event_manager.update();
}