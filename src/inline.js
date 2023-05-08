/*
Basic idea - getting this component from 
https://github.com/WordPress/gutenberg/tree/trunk/packages/format-library/src/link
Then cutting anything we don't need
Instead of looking for WP API data, for instance, we will rather fetch data
from the sports API being used
*/

import { useState, useRef, createInterpolateElement } from '@wordpress/element';

// DON'T THINK WE NEED THIS ONE FOR NOW
//import { __, sprintf } from '@wordpress/i18n';
// withSpokenMessages seems useful for the Popover on teams, so we should use
// this HOC wrapping the component
import { withSpokenMessages, Popover } from '@wordpress/components';

// NOT AN URL
//import { prependHTTP } from '@wordpress/url';
import {
	create,
	insert,
	isCollapsed,
	applyFormat,
	useAnchor,
	removeFormat,
	slice,
	replace,
	split,
	concat,
} from '@wordpress/rich-text';

/*
Is not a link search, but a search field that can provide some results
so we should add the correspondent component instead. Search Control +
using State should work

import {
	__experimentalLinkControl as LinkControl,
	store as blockEditorStore,
} from '@wordpress/block-editor';
*/

import { SearchControl } from '@wordpress/components';

// NOT USING INTERNAL DATA, BUT EXTERNAL
// import { useSelect } from '@wordpress/data';

function InlineSportsUI( {
	isActive,
	value,
} ) {
	const richTeamTextValue = getTeamValueFromSelection( value, isActive );
	const richTeamEscaped = richTeamTextValue.text;

	const [ nextTeamValue, setNextTeamValue ] = useState();
}

function getTeamValueFromSelection( value, isActive ) {

}