import { GameState } from "./gamestate";

export const gameState = new GameState();

window.onload = () => {
	main();
};

function main(): void {
	gameState.update();
}