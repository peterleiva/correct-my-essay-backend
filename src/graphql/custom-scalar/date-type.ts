/**
 * @fileoverview Date custom scalar type
 */

import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

const parser = (isoDate: string) => new Date(isoDate);

export default new GraphQLScalarType({
	name: 'Date',
	description: 'Date scalar type uses the js parser to manipulate a ISO8601 ' +
	'string date',
	serialize: (value: Date) => {
		if (value instanceof Date) {
			return value.toISOString();
		}

		throw new Error(`Date serialize date object instead of ${value}`);
	},
	parseValue: parser,
	parseLiteral: (ast: ValueNode) => {
		if (ast.kind === Kind.STRING) return parser(ast.value);

		throw new Error('Value suplied must be a string');
	}
});
