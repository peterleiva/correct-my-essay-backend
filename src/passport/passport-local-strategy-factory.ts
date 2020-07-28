/**
 * @fileoverview This files contains a passport strategy factory
 */

import { Strategy } from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import PassportStrategyFactory from './passport-strategy-factory.interface';


/**
 * Creates a local passport factory
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

	private verify(username, password, done): void {
		return ;
	}
}

export default PassportLocalStrategyFactory;
