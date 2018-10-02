export class ArrayUtil {
	public static get_index(array: any, obj: any): number {
		let index = -1;
		let i = 0;
		while (index === -1 && i < array.length) {
			if (array[i] === obj) {
				index = i;
			}
			i++;
		}
		return index;
	}
	
	public static remove_from_array(array: any, obj: any): boolean {
		if (array.includes(obj)) {
			array.splice(this.get_index(array, obj), 1);
			return true;
		}
		return false;
	}

	public static diff(array1: Array<any>, array2: Array<any>): Array<any> {
		return array1.filter(function (i) { return array2.indexOf(i) < 0; });
	}
}