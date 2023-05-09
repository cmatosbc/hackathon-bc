import metadata from './block.json';
import getDataFromApi from './request';

import {
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';

import {
  RichTextToolbarButton,
  RichTextShortcut
} from '@wordpress/editor';

import { addTemplate } from '@wordpress/icons';
import { Popover } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';

const triggerTypes = [
	  {
	    name: 'team',
	    title: 'Team',
	    character: '.'
	  }
	];

triggerTypes.forEach(({ name, title, character, icon }) => {
  const type = `templated/${name}`

  registerFormatType(type, {
    title,
    tagName: name,
    className: 'trigger-tag-' + name,
    attributes: {
      dataId: 'data-id'
    },
    edit ({ isActive, value, onChange }) {

      var apiResults = false;
      let maybePopover = false;

      if (value.activeFormats.length != 0) {
        apiResults = getDataFromApi(value.text.substring(value.start, value.end));
      }

      if (apiResults) {
        console.log(apiResults);
        maybePopover = createElement(Popover, {

        });
      }

      const onToggle = () => onChange(toggleFormat(value, { type }));

      return (
        createElement(Fragment, null,
          createElement(RichTextShortcut, {
            type: 'primary',
            character,
            onUse: onToggle
          }),
          createElement(RichTextToolbarButton, {
            title,
            onClick: onToggle,
            icon: addTemplate,
            isActive: maybePopover,
            shortcutType: 'primary',
            shortcutCharacter: character,
            className: `toolbar-button-with-text toolbar-button__advanced-${name}`
          }),
        )
      )
    }
  })
})