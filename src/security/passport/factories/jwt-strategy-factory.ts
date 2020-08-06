/**
 * @fileoverview Passport jwt strategy factory
 */

import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions }
	from 'passport-jwt';
import StrategyFactory from './strategy-factory.interface';

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
	 * Creates a jwt passport strategy
	 *
	 * @return {JWTStrategy}
	 */
	factory(): JWTStrategy {
		return new JWTStrategy(JWTStrategyFactory.strategyOpts, this.verify);
	}

	/**
	 * Verify strategy function used for authentication
	 */
	private verify() {
		throw Error('not implemented');
	}
}

export default JWTStrategyFactory;
