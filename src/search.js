import { SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

function teamsSearch ( { className, setState } ) {

  const [ searchTeamInput, setSearchTeamInput ] = useState( '' );

  return (
    <SearchControl
      value={ searchTeamInput }
      onChange={ setSearchTeamInput }
    />
  );
}