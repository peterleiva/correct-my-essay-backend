/**
 * @fileoverview Throws this error when the record already exists
 */

/**
 * Already exists error when trying to save a existing record
 */
class AlreadyExistsError extends Error {
	/**
	 * extends js error class
	 */
	constructor(private _key: string, private _value: string) {
		super(`Record with key ${_key} and value ${_value} already exists`);
	}

	/**
	 * key getter
	 */
	get key(): string {
		return this._key;
	}

	/**
	 * value getter
	 */
	get value(): string {
		return this._value;
	}
}

export default AlreadyExistsError;
