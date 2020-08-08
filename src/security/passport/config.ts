/**
 * @fileoverview Configures passport strategies
 */

import passport = require('passport');
import LocalStrategyFactory from './factories/local-strategy-factory';
import JWTStrategyFactory from './factories/jwt-strategy-factory';

passport.use(LocalStrategyFactory.factory());
passport.use(JWTStrategyFactory.factory());

export default passport;
