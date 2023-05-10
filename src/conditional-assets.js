import { useSelect } from '@wordpress/data';

export default function () {
  const blocksInPost = useSelect( (select) => {
    return select( 'core/block-editor' ).getBlocks();
  }, [] );
  
  let i = 0;
  
  blocksInPost.forEach( (element, index) => {
    if (element.attributes.content.includes('trigger-tag-')) {
      i++;
    }
  });

  return i > 0;
}


