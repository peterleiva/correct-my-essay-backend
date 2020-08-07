/**
 * @fileoverview JsonApiSerializer core jsonapi serializer
 */

const JSONAPISerializer = require('json-api-serializer');

const Serializer = new JSONAPISerializer({
	convertCase: 'kebab-case',
});

export default Serializer;
