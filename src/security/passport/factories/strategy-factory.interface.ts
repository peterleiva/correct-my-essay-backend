/**
 * @fileoverview Abstract passport strategy factory
 */

import { Strategy } from 'passport';

interface StrategyFactory {
	/**
	 * Factory method
	 * @return {passport.Strategy}
	 */
	strategy(): Strategy;
}


export default StrategyFactory;
