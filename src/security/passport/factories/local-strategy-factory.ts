/**
 * @file This files contains a passport strategy factory
 */

import { Strategy } from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import StrategyFactory from './strategy-factory.interface';
import { UserDocument, UserModel } from '../../../user';

/**
 * Local passport strategy factory
 *
 * @class
 */
class LocalStrategyFactory implements StrategyFactory {
	/**
	 * Transform the factory as a private
	 */
	private constructor() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	}

	/**
	 * Creates passport local strategy configuring a veriry auth function
	 *
	 * @return {Strategy} passport local strategy properly configured
	 */
	static factory(): Strategy {
		return new LocalStrategyFactory().strategy();
	}

	/**
	 * Creates passport local strategy configuring a veriry auth function
	 *
	 * @return {Strategy} passport local strategy properly configured
	 */
	strategy(): Strategy {
		return new LocalStategy(
			{
				usernameField: 'email',
				session: false,
			},
			this.verify
		);
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
	 * @param {String} email
	 * @param {String} password
	 * @param {Function} done called to indicating termination process
	 */
	private verify(
		email: string,
		password: string,
		done: (error: string, user?: UserDocument | false) => void
	): void {
		UserModel.findByEmail(email)
			.then(async user => {
				const authorized = await user.credential?.authorize(password);

				return authorized ? done(null, user) : done(null, false);
			})
			.catch(done);
	}
}

export default LocalStrategyFactory;
