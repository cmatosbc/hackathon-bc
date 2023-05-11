<?php
/**
 * Plugin Name:       Gutenpride
 * Description:       A Gutenberg block to show your pride! This block enables you to type text and style it with the color font Gilbert from Type with Pride.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenpride
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gutenpride_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gutenpride_block_init' );

add_action('wp_footer', function() {
    include(__DIR__ . '/templates/players.html');
    include(__DIR__ . '/templates/teams.html');
    ?>
    <script type="text/javascript">
        const actionable = document.querySelectorAll('.trigger-tag-team');
        
        actionable.forEach( (element) => {
            element.addEventListener('click', (e) => {
                if (!(element instanceof TemplateTag)) {
                    customElements.define('team-div', TemplateTag);
                } else {
                    customElements.get('team-div');
                }
            });
        });

        class TemplateTag extends HTMLElement {

            static get observedAttributes() {
              return ['open'];
            }

            constructor() {
                super();
                let template = document.getElementById("teams-template");
                let templateContent = template.content;
                this.apiKey = '784166e8damshc6d584f31ac3909p179b89jsn9d778e3690a7';
                this.apiHost = 'api-football-v1.p.rapidapi.com';

                this.term = this.getAttribute('data-team-id');
                this.addEventListener('click', (e) => {
                    const shadowRoot = this.attachShadow({ mode: "open" });         
                    shadowRoot.appendChild(templateContent.cloneNode(true));

                    this.getData();
                });
            }

            async getData() {
                  var myHeaders = new Headers();
                  myHeaders.append("X-RapidAPI-Key", this.apiKey);
                  myHeaders.append("X-RapidAPI-Host", this.apiHost);
                  myHeaders.append("Content-type", "application/json");
                  var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                  
                  const apiData = fetch("https://api-football-v1.p.rapidapi.com/v3/teams?id=" + this.term, requestOptions)
                      .then((data) => data.json())
                      .then((data) => {
                        let parsed = { ...data };
                        let results = [];
                        parsed.response.forEach( (element, index) => {
                          results.push({
                            teamName: element.team.name,
                            teamCountry: element.team.country,
                            teamLogo: element.team.logo,
                            teamVenue: element.venue.name,
                            teamVenuePic: element.venue.image
                          });
                        });

                        console.log(results);
                        const slotImg = document.createElement('img');
                        slotImg.src = results[0].teamVenuePic;
                        slotImg.setAttribute('slot', 'stadium-img');
                        const theName = document.createElement('div');
                        theName.setAttribute('slot', 'team-name');
                        theName.textContent = results[0].teamName;
                        const theVenue = document.createElement('div');
                        theVenue.setAttribute('slot', 'venue');
                        theVenue.textContent = results[0].teamVenue;

                        this.appendChild(slotImg);
                        this.appendChild(theName);
                        this.appendChild(theVenue);
                      })
                      .catch(error => console.log('error', error));

            }
        }

        //customElements.define('team-div', TemplateTag);

    </script>
    <?php
});
