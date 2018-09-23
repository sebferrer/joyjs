import { EventManager } from "./event_manager";
import { EventType } from "./event_type";

export const eventManager = new EventManager(EventType.MOUSE);

window.onload = () => {
	main();
};

function main(): void {
	eventManager.update();
}