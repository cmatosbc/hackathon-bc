import metadata from './block.json';
import getDataFromApi from './request';
import './editor.scss';

import {
  registerFormatType,
  toggleFormat,
  applyFormat
} from '@wordpress/rich-text';

import {
  RichTextToolbarButton,
  RichTextShortcut
} from '@wordpress/editor';

import { useState, useRef } from '@wordpress/element';

import { addTemplate } from '@wordpress/icons';
import { SelectControl, PanelBody } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
import { InspectorControls } from "@wordpress/block-editor";

const Dialog = (props) => {
  const {dialog} = props;
  return <dialog ref={dialog}>
    <p>Response is empty</p>
    <form
      method="dialog"
      className='text-center'
    >
      <button>OK</button>
    </form>
  </dialog>
}

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
    edit: ({ isActive, value, onChange }) => {

      const [ isVisible, setIsVisible ] = useState( false );
      const [ data, setData ] = useState([]);
      const [ team, setTeam ] = useState();

      const dialog = useRef(null);

      const addFormat = (dataTeamId, dataVenueId) => {
        onChange(applyFormat(
          value,
          {
            type,
            attributes: {
              dataTeamId: dataTeamId,
              dataVenueId: dataVenueId
            }
          }
        ));
      }

      const selectOnChange = (teamName, parsedData)  => {

        if(!!teamName) {

          const teamItem = parsedData.filter((item) => {
            return teamName == item.value;
          });

          setTeam(teamName);

          addFormat(
            teamName?.toString(),
            !!teamItem[0]?.venueId ? teamItem[0]?.venueId?.toString() : "0"
          );
        }
      }

      const CitySelect = (props) => {

        const parsedData = props.data.map((teamItem) => {
          return {
            'value': teamItem.team.id,
            'label': teamItem.team.name,
            'venueId': teamItem.venue.id
          }
        });

        return (
          <SelectControl
            label="Team"
            value={ team }
            onChange={ teamName => selectOnChange(teamName, parsedData) }
            options={ parsedData }
          />
        );
      }

      if (
        !!isVisible &&
        value.activeFormats?.length !== 0
      ) {
        onChange(toggleFormat(
          value,
          {
            type: type
          }
        ));

        setIsVisible(false);
      }

      if (
        !!isVisible &&
        value.activeFormats?.length === 0
      ) {

        getDataFromApi(value.text.substring(value.start, value.end))
        .then(result => {
          if (result.response.length === 0) {
            dialog.current.showModal();
            setIsVisible(false);
            return;
          }

          if (result.response?.length > 0) {
            setData(result.response);
            setIsVisible(false);

            setTeam(result.response[0].team.id);

            addFormat(
              result.response?.[0]?.team?.id?.toString(),
              result.response?.[0]?.venue?.id?.toString()
            );
          }
        });
      }

      const onToggle = () => {
        setIsVisible(!isVisible)
      };

      return (
        <>
          <RichTextShortcut
            type={'primary'}
            character={character}
            onUse={onToggle}
          />
          <RichTextToolbarButton
            title={title}
            onClick={onToggle}
            icon={addTemplate}
            isActive={isActive}
            shortcutType={'primary'}
            shortcutCharacter={character}
            className={`toolbar-button-with-text toolbar-button__advanced-${name}`}
          />

          <Dialog
            dialog={dialog}
          />

          {(data?.length > 0) && <InspectorControls>
            <PanelBody title="Team Option" initialOpen={true}>
              <CitySelect
                data={data}
              />
            </PanelBody>
          </InspectorControls>}
        </>
      )
    }
  })
})