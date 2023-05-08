import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const withTemplateTag = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			return (
					<template><BlockEdit { ...props } /></template>
			);
		}

}, 'withTemplateTag');

export default withTemplateTag;