/**
 * @fileoverview This files contains a passport strategy factory
 */

import { Strategy } from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import PassportStrategyFactory from './passport-strategy-factory.interface';


/**
 * Local passport strategy factory
 *
 * @class
 */
class PassportLocalStrategyFactory implements PassportStrategyFactory {
	/**
	 * Creates passport local strategy configuring the apropriated post field
	 *
	 * @return {Strategy} passport local strategy properly configured
	 */
	factory(): Strategy {
		return new LocalStategy({
			usernameField: 'email',
			session: false,
		}, this.verify);
	}

	/**
	 * Authenticator used for authenticate users on passport local strategy
	 *
	 * @param {String} username
	 * @param {String} password
	 * @param {Function} done
	 */
	private verify(username: string, password: string,
		done: (error: string) => void): void {
		done('not implemented');
	}
}

export default PassportLocalStrategyFactory;
