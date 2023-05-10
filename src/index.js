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
      const setActive = () => {
        setIsVisible(!isVisible)
      }
      const [ data, setData ] = useState([]);
      const [ team, setTeam ] = useState();
      const dialog = useRef(null);

      function MyComboboxControl(props) {

        const parsedData = props.data.map((teamItem) => {
          return {'value': teamItem.team.id, 'label': teamItem.team.name, 'venueId': teamItem.venue.id}
        });

        return (
          <SelectControl
            label="Team"
            value={ team }
            onChange={ teamName => {

              if(!!teamName) {

                const teamItem = parsedData.filter((item) => {
                  return teamName == item.value
                })

                setTeam(teamName)

                onChange(applyFormat(
                  value,
                  {
                    type,
                    attributes: {
                      dataTeamId: teamName?.toString(), // REPLACE FOR THE TEAM ID
                      dataVenueId: teamItem[0]?.venueId?.toString() // REPLACE FOR THE VENUE ID
                    }
                  }
                ))
              }
            }}
            options={ parsedData }
          />
        );
      }

      if (isVisible === true && value.activeFormats?.length !== 0) {
        onChange(toggleFormat(
          value,
          {
            type: type
          },
          value.start,
          value.end
        ));

        setIsVisible(false);
      }

      if ( isVisible === true && value.activeFormats?.length === 0) {

        var myHeaders = new Headers();
        myHeaders.append("X-RapidAPI-Key", "784166e8damshc6d584f31ac3909p179b89jsn9d778e3690a7");
        myHeaders.append("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com");
        myHeaders.append("Content-type", "application/json");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search=" + value.text.substring(value.start, value.end), requestOptions)
          .then((data) => {
            return data;
          })
          .then(result => result.json())
          .then(result => {

            if (result.response.length === 0) {
              dialog.current.showModal();
              setIsVisible(false);
              return;
            }

            if (result) {
              setData(result.response);
              setIsVisible(false);

              setTeam(result.response[0].team.id);

              onChange(applyFormat(
                value,
                {
                  type,
                  attributes: {
                    dataTeamId: result.response?.[0]?.team?.id?.toString(), // REPLACE FOR THE TEAM ID
                    dataVenueId: result.response?.[0]?.venue?.id?.toString() // REPLACE FOR THE VENUE ID
                  }
                }
              ))
            }

          })
          .catch(error => console.log('error', error));
      }

      const onToggle = () => {
        setActive();
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

          <dialog ref={dialog}>
            <p>Response is empty</p>
            <form
              method="dialog"
              className='text-center'
            >
              <button>OK</button>
            </form>
          </dialog>

          {(data?.length > 0) && <InspectorControls>
            <PanelBody title="Team Option" initialOpen={true}>
              <MyComboboxControl
                data={data}
              />
            </PanelBody>
          </InspectorControls>}
        </>
      )
    }
  })
})