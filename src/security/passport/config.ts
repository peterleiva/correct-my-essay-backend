/**
 * @fileoverview Configures passport strategies
 */

import passport = require('passport');
import LocalStrategyFactory from './factories/local-strategy-factory';

passport.use((new LocalStrategyFactory()).factory());

export default passport;
