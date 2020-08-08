/**
 * @fileoverview Passport jwt strategy factory
 */

import {
	Strategy as JWTStrategy,
	ExtractJwt,
	StrategyOptions,
	VerifiedCallback,
} from 'passport-jwt';
import StrategyFactory from './strategy-factory.interface';
import { User } from '../../../user';

/**
 * Jwt passport factory
 *
 * @see https://www.npmjs.com/package/passport-jwt
 */
class JWTStrategyFactory implements StrategyFactory {
	private static strategyOpts: StrategyOptions = {
		secretOrKey: process.env.JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	}

	/**
	 * Transform strategy as a singleton
	 */
	private constructor() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	}

	/**
	 * Alias for strategy to become a singleton
	 *
	 * @return {JWTStrategy}
	 */
	static factory(): JWTStrategy {
		return new JWTStrategyFactory().strategy();
	}

	/**
	 * Creates a jwt passport strategy
	 *
	 * @return {JWTStrategy}
	 **/
	strategy(): JWTStrategy {
		return new JWTStrategy(JWTStrategyFactory.strategyOpts, this.verify);
	}

	/**
	 * Verify strategy function used for authentication
	 *
	 * Uses the payload subject to identify the user. When the user is located or
	 * there's any error the done function gets called
	 *
	 * @param {any} payload jwt payload decoded
	 * @param {passport-jwt.VerifyCallback} done called by password when terminate
	 * @return {Promise<void>}
	 */
	private async verify(payload: any,
		done: VerifiedCallback): Promise<void> {
		User.findById(payload.sub)
			.then(user => user ? done(null, user) : done(null, false))
			.catch(done);
	}
}

export default JWTStrategyFactory;
