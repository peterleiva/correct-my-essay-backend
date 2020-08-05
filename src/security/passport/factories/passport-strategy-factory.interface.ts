/**
 * @fileoverview Abstract passport strategy factory
 */

import { Strategy } from 'passport';

interface PassportStrategyFactory {
	/**
	 * Factory method
	 * @return {passport.Strategy}
	 */
	factory(): Strategy;
}


export default PassportStrategyFactory;
