export class TouchHelper {
	public static touchlist_to_array(touchlist: TouchList): Array < any > {
		const touches_array = new Array<any>();
		if(touchlist != null) {
		for (let i = 0; i < touchlist.length; i++) {
			touches_array.push(touchlist[i]);
		}
	}
	return touches_array;
	}
	
	public static touchlist_to_id_array(touchlist: TouchList): Array < number > {
		const touches_id_array = new Array<number>();
		if(touchlist != null) {
		for (let i = 0; i < touchlist.length; i++) {
			touches_id_array.push(touchlist[i].identifier);
		}
	}
	return touches_id_array;
	}
	
	public static get_touch_by_identifier(touchlist: TouchList, identifier: number): any {
		for (let i = 0; i < touchlist.length; i++) {
			if (touchlist[i].identifier === identifier) {
				return touchlist[i];
			}
		}
	}
}