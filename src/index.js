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

import { useState } from '@wordpress/element';

import { addTemplate } from '@wordpress/icons';
import { Popover, Button, ComboboxControl, PanelBody } from '@wordpress/components';
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
      const [ teamId, setTeamId ] = useState(0);
      const [ venueId, setVenueId ] = useState(0);

      function MyComboboxControl(props) {
        console.log(props)
        const parsedData = props.data.map((teamItem) => {
          return {'value': teamItem.team.name, 'label': teamItem.team.name, 'teamId': teamItem.team.id, 'venueId': teamItem.venue.id}
        });

        const [ team, setTeam ] = useState();
        const [ filteredOptions, setFilteredOptions ] = useState( parsedData );
        return (
          <ComboboxControl
            label="Team"
            value={ team }
            onChange={ teamName => {

              const selectedTeam = parsedData.filter((teamOption) => {
                return teamOption.label === teamName
              });

              !!selectedTeam && (

                setTeam(teamName),
                setTeamId(selectedTeam[0]?.teamId),
                setVenueId(selectedTeam[0]?.venueId),

                onChange(applyFormat(
                  value,
                  {
                    type,
                    attributes: {
                      dataTeamId: selectedTeam[0]?.teamId?.toString(), // REPLACE FOR THE TEAM ID
                      dataVenueId: selectedTeam[0]?.venueId?.toString() // REPLACE FOR THE VENUE ID
                    }
                  }
                ))

              )
            }}
            options={ filteredOptions }
            onFilterValueChange={ ( inputValue ) =>
              setFilteredOptions(
                parsedData.filter( ( option ) =>
                  option.label
                    .toLowerCase()
                    .startsWith( inputValue.toLowerCase() )
                )
              )
            }
          />
        );
      }

      console.log(value);
      console.log(isVisible);

      if (isVisible === true) {
        console.log('fetch')

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

            if (result) {
              setData(result.response);
              setIsVisible(false);
            }

          })
          .catch(error => console.log('error', error));
      }

      const onToggle = () => {
        setActive();
        // onChange(applyFormat(
        //   value,
        //   {
        //     type,
        //     attributes: {
        //       dataTeamId: teamId.toString(), // REPLACE FOR THE TEAM ID
        //       dataVenueId: venueId.toString() // REPLACE FOR THE VENUE ID
        //     }
        //   }
        // ))
      };

      return (
        <>
          <RichTextShortcut
            type={'primary'}
            character
            onUse={onToggle}
          />
          <RichTextToolbarButton
            title
            onClick={onToggle}
            icon={addTemplate}
            isActive={isActive}
            shortcutType={'primary'}
            shortcutCharacter={character}
            className={`toolbar-button-with-text toolbar-button__advanced-${name}`}
          />

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