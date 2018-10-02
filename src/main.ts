import { EventManager } from "./event_manager";
import { EventType } from "./event_type";

export const window_W = window.innerWidth;
export const window_H = window.innerHeight;

export const eventManager = new EventManager(EventType.TOUCH);

window.onload = () => {
	main();
};

function main(): void {
	eventManager.update();
}