/**
 * Carga todos los iconos necesario para la plataforma con la posibilidad de dar colores personalizados
 */

/* eslint-disable one-var */
const svgWrap = document.createElement('div'),

  svgData = `


  <!-- SVG-location-->  
  <svg style="display: none;">
    <symbol id="svg-location" viewBox="0 0 9.189 13.12" preserveAspectRatio="xMinYMin meet">
      <path d="M12.095,3A4.591,4.591,0,0,0,7.5,7.595c0,3.446,4.595,8.533,4.595,8.533s4.595-5.087,4.595-8.533A4.591,4.591,0,0,0,12.095,3Zm0,6.236a1.641,1.641,0,1,1,1.641-1.641A1.642,1.642,0,0,1,12.095,9.236Z" transform="translate(-7.5 -3)" />
    </symbol>
  </svg>

  <!-- SVG-location-->

  <!-- SVG my-location-->  
  <svg style="display: none;">
    <symbol id="svg-my-location" viewBox="0 0 19 19" preserveAspectRatio="xMinYMin meet">
      <path d="M11,7.545A3.455,3.455,0,1,0,14.455,11,3.454,3.454,0,0,0,11,7.545Zm7.721,2.591a7.768,7.768,0,0,0-6.857-6.857V1.5H10.136V3.279a7.768,7.768,0,0,0-6.857,6.857H1.5v1.727H3.279a7.768,7.768,0,0,0,6.857,6.857V20.5h1.727V18.721a7.768,7.768,0,0,0,6.857-6.857H20.5V10.136ZM11,17.045A6.045,6.045,0,1,1,17.045,11,6.041,6.041,0,0,1,11,17.045Z" transform="translate(-1.5 -1.5)" />
    </symbol>
  </svg>
  <!-- SVG my-location-->


  <!-- SVG search-->  
  <svg style="display: none;">
    <symbol id="svg-search" viewBox="0 0 13.674 13.674" preserveAspectRatio="xMinYMin meet">
      <path d="M5.929-.028a5.929,5.929,0,1,0,0,11.857,5.86,5.86,0,0,0,2.812-.695,1.694,1.694,0,0,0,.22.22l1.694,1.694a1.728,1.728,0,1,0,2.439-2.439L11.4,8.916a1.694,1.694,0,0,0-.271-.22,5.849,5.849,0,0,0,.745-2.812A5.935,5.935,0,0,0,5.946-.045Zm0,1.694A4.215,4.215,0,0,1,10.164,5.9,4.248,4.248,0,0,1,9.046,8.814l-.051.051a1.694,1.694,0,0,0-.22.22,4.239,4.239,0,0,1-2.863,1.067,4.235,4.235,0,0,1,0-8.47Z" transform="translate(0 0.045)" />
    </symbol>
  </svg>
  <!-- SVG search-->
  
  <!-- SVG marker-->  
  <svg style="display: none;">
    <symbol id="svg-marker" viewBox="0 0 15.117 21.595" preserveAspectRatio="xMinYMin meet">
      <defs>
        <clipPath id="clip-path-marker">
          <rect id="Rectángulo_107" />
        </clipPath>
      </defs>
      <g transform="translate(-354.883 -991.25)">
        <g transform="translate(188.627 196.358)">
          <path d="M15.058,3A7.553,7.553,0,0,0,7.5,10.558c0,5.669,7.558,14.037,7.558,14.037s7.558-8.368,7.558-14.037A7.553,7.553,0,0,0,15.058,3Z" transform="translate(158.756 791.892)" fill="#08d5ff"/>
          <g transform="translate(172.184 800.076)">
            <g clip-path="url(#clip-path-marker)">
              <path d="M.157,0H1.7a.157.157,0,0,1,.125.062L4.231,3.226,1.821,6.389a.157.157,0,0,1-.125.062H.157A.157.157,0,0,1,.032,6.2L2.3,3.226.032.252A.157.157,0,0,1,.157,0" transform="translate(0)" fill="#fff"/>
            </g>
          </g>
        </g>
      </g> 
    </symbol>
  </svg>
  <!-- SVG marker-->


  `

svgWrap.innerHTML = svgData
document.body.appendChild(svgWrap)

/**
 * @module Utils/icons
 */
