/**
 * @file TextDocument Controller
 */

import TextModel, { TextDocument } from './text-document';
import { isValidObjectId } from 'mongoose';

/**
 * Returns a text document object by its id or null if there's none
 *
 * @param {string} id - text id
 * @return {Promise<TextDocument>}
 */
export async function getTextById(id?: string): Promise<TextDocument> {
	if (!isValidObjectId(id)) return null;
	return TextModel.findById(id).exec();
}

/**
 * Create a new text document
 *
 * @param {TextDocument} text
 * @return {Promise<TextDocument>}
 */
export async function create(text: TextDocument): Promise<TextDocument> {
	const doc = new TextModel(text);
	const textDoc = await doc.save();

	return textDoc === doc ? textDoc : null;
}
