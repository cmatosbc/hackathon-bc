import metadata from './block.json';

import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import {
  RichTextToolbarButton,
  RichTextShortcut
} from '@wordpress/editor';

import { addTemplate } from '@wordpress/icons';

import { createElement, Fragment } from '@wordpress/element';

const triggerTypes = [
	  {
	    name: 'team',
	    title: 'Team',
	    character: '.'
	  },
	  {
	    name: 'tournament',
	    title: 'Tournament',
	    character: ','
	  }
	];

triggerTypes.forEach(({ name, title, character, icon }) => {
  const type = `templated/${name}`

  registerFormatType(type, {
    title,
    tagName: name,
    className: 'trigger-tag-' + name,
    edit ({ isActive, value, onChange }) {
      const onToggle = () => onChange(toggleFormat(value, { type }))

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
            isActive,
            shortcutType: 'primary',
            shortcutCharacter: character,
            className: `toolbar-button-with-text toolbar-button__advanced-${name}`
          })
        )
      )
    }
  })
})