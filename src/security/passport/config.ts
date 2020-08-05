/**
 * @fileoverview Configures passport strategies
 */

import passport = require('passport');
import PassportLocalStrategyFactory from './passport-local-strategy-factory';

passport.use((new PassportLocalStrategyFactory()).factory());

export default passport;
