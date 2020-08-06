/**
 * @fileoverview This files contains a passport strategy factory
 */

import { Strategy } from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import StrategyFactory from './strategy-factory.interface';
import { UserDocument, User } from '../../../user';


/**
 * Local passport strategy factory
 *
 * @class
 */
class LocalStrategyFactory implements StrategyFactory {
	/**
	 * Creates passport local strategy configuring a veriry auth function
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
	 * Authenticate user with credential verifying a username and password match
	 *
	 * Defines the verify function for passport strategy. User are find by email
	 * and authorization process is checked by user with credentials. If the user
	 * do not authorize or dot not exists the done is invoked with false value. to
	 * indicating its failure.
	 * Done can be returned if any errors is caused by the authentication or find
	 * process
	 *
	 * @param {String} username
	 * @param {String} password
	 * @param {Function} done
	 */
	private async verify(username: string, password: string,
		done: (error: string, user?: UserDocument | false) => void): Promise<void> {
		try {
			const user = await User.findByEmail(username);
			if (!user) {
				return done(null, false);
			}

			const authorized = await user.credential?.authorize(password);

			return authorized ? done(null, user) : done(null, false);
		} catch (error) {
			return done(error);
		}
	}
}

export default LocalStrategyFactory;
