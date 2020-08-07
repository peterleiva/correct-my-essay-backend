/**
 * @fileoverview JsonApiSerializer base configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSONAPISerializer = require('json-api-serializer');

const Serializer = new JSONAPISerializer({
	convertCase: 'kebab-case',
});

export default Serializer;
