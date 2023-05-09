import metadata from './block.json';
import getDataFromApi from './request';

import {
  registerFormatType,
  toggleFormat,
  applyFormat
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
      dataTeamId: 'data-team-id',
      dataVenueId: 'data-venue-id'
    },
    edit ({ isActive, value, onChange }) {

      var apiResults = false;
      let maybePopover = false;

      if (value.activeFormats.length != 0) {
        apiResults = getDataFromApi(value.text.substring(value.start, value.end));
        // PARSE RESULTS TO GET IDS
      }

      if (apiResults) {
        console.log(apiResults);
        maybePopover = createElement(Popover, {
          // MOCK FOR POPOVER SELECT/SEARCH BOX
        });
      }

      const onToggle = () => onChange(applyFormat(
        value,
        {
          type,
          attributes: {
            dataTeamId: '89', // REPLACE FOR THE TEAM ID
            dataVenueId: '90' // REPLACE FOR THE VENUE ID
          }
        }
      ));

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