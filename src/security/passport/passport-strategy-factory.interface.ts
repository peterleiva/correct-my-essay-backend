/**
 * @fileoverview Abstract passport strategy factory
 */

import { Strategy } from 'passport';

interface PassportStrategyFactory {
	factory(): Strategy;
}


export default PassportStrategyFactory;
