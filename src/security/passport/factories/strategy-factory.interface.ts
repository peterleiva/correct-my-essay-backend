/**
 * @fileoverview Abstract passport strategy factory
 */

import { Strategy } from 'passport';

interface StrategyFactory {
	/**
	 * Factory method
	 * @return {passport.Strategy}
	 */
	factory(): Strategy;
}


export default StrategyFactory;
