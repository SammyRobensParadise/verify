import React from 'react'
import Svg, { Path, Circle, Mask, Defs, LinearGradient, Stop } from 'react-native-svg'
import { Dimensions } from 'react-native'

export const LogoV = () => {
  return (
    <Svg
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path fill="#7000FF" d="M0 0h100v100H0z" />
      <Circle cx={50} cy={50} r={49.5} fill="#fff" stroke="#fff" />
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={13.33}
        y={15.6}
        width={69}
        height={63}
        fill="#000"
      >
        <Path fill="#fff" d="M13.33 15.6h69v63h-69z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.63 76l22.05-59.4H60.51L46.65 56.2l-3.6 11.7-3.6-11.79-.207-.589-8.61 2.307L37.38 76h11.25zM28.615 52.388L15.33 16.6h10.26l11.735 33.454-8.71 2.334zM79.23 65.65c-1.2-1.2-2.82-1.8-4.86-1.8-2.1 0-3.78.6-5.04 1.8-1.2 1.14-1.8 2.7-1.8 4.68 0 1.98.6 3.57 1.8 4.77 1.26 1.2 2.94 1.8 5.04 1.8 2.04 0 3.66-.6 4.86-1.8 1.26-1.2 1.89-2.79 1.89-4.77 0-1.98-.63-3.54-1.89-4.68z"
        />
      </Mask>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.63 76l22.05-59.4H60.51L46.65 56.2l-3.6 11.7-3.6-11.79-.207-.589-8.61 2.307L37.38 76h11.25zM28.615 52.388L15.33 16.6h10.26l11.735 33.454-8.71 2.334zM79.23 65.65c-1.2-1.2-2.82-1.8-4.86-1.8-2.1 0-3.78.6-5.04 1.8-1.2 1.14-1.8 2.7-1.8 4.68 0 1.98.6 3.57 1.8 4.77 1.26 1.2 2.94 1.8 5.04 1.8 2.04 0 3.66-.6 4.86-1.8 1.26-1.2 1.89-2.79 1.89-4.77 0-1.98-.63-3.54-1.89-4.68z"
        fill="#fff"
      />
      <Path
        d="M70.68 16.6l.937.348.5-1.348H70.68v1zM48.63 76v1h.695l.242-.652L48.63 76zm11.88-59.4v-1h-.71l-.234.67.944.33zM46.65 56.2l-.944-.33-.007.018-.005.018.956.294zm-3.6 11.7l-.957.292.953 3.12.96-3.118-.956-.294zm-3.6-11.79l.956-.292-.006-.02-.007-.019-.943.331zm-.207-.589l.944-.33-.307-.876-.896.24.26.966zm-8.61 2.307l-.258-.966-1.06.284.381 1.03.938-.348zM37.38 76l-.938.348.242.652h.696v-1zm-8.765-23.612l-.938.348.317.854.88-.236-.26-.966zM15.33 16.6v-1h-1.438l.5 1.348.938-.348zm10.26 0l.943-.331-.234-.669h-.71v1zm11.735 33.454l.259.966 1.042-.28-.357-1.017-.944.331zM79.231 65.65l-.707.707.018.018.018.016.671-.741zm-9.9 0l.689.725-.689-.725zm0 9.45l-.707.707.008.009.01.008.689-.724zm9.9 0l-.69-.724-.008.008-.01.009.708.707zm-9.489-58.848l-22.05 59.4 1.875.696 22.05-59.4-1.875-.696zM60.51 17.6h10.17v-2H60.51v2zM47.594 56.53l13.86-39.6-1.888-.66-13.86 39.6 1.887.66zm-3.589 11.664l3.6-11.7-1.911-.588-3.6 11.7 1.911.588zm-5.512-11.792l3.6 11.79 1.913-.584-3.6-11.79-1.913.584zm-.194-.55l.207.589 1.887-.662-.206-.589-1.888.662zm.685-1.297l-8.609 2.307.518 1.932 8.609-2.307-.518-1.932zm-.667 21.097L31.571 57.48l-1.875.696 6.746 18.172 1.875-.696zM48.63 75H37.38v2h11.25v-2zM29.552 52.04L16.267 16.252l-1.875.696 13.285 35.788 1.875-.696zM15.33 17.6h10.26v-2H15.33v2zm9.316-.669l11.736 33.454 1.887-.662L26.533 16.27l-1.887.662zm4.227 36.423l8.711-2.334-.518-1.932-8.71 2.334.517 1.932zM74.371 64.85c1.832 0 3.177.532 4.153 1.507l1.414-1.414c-1.424-1.425-3.32-2.093-5.567-2.093v2zm-4.35 1.524c1.037-.987 2.45-1.524 4.35-1.524v-2c-2.3 0-4.247.663-5.73 2.076l1.38 1.448zm-1.49 3.956c0-1.764.526-3.04 1.489-3.955l-1.378-1.45c-1.437 1.365-2.111 3.209-2.111 5.405h2zm1.507 4.063c-.981-.981-1.507-2.3-1.507-4.063h-2c0 2.198.674 4.058 2.093 5.477l1.414-1.414zm4.333 1.507c-1.9 0-3.313-.537-4.35-1.524l-1.38 1.448c1.483 1.413 3.43 2.076 5.73 2.076v-2zm4.153-1.507c-.976.975-2.32 1.507-4.153 1.507v2c2.248 0 4.143-.668 5.567-2.093l-1.414-1.414zm1.597-4.063c0 1.748-.546 3.061-1.58 4.046l1.38 1.448c1.486-1.415 2.2-3.282 2.2-5.494h-2zm-1.56-3.939c1.014.92 1.56 2.19 1.56 3.939h2c0-2.211-.714-4.06-2.22-5.421l-1.34 1.482z"
        fill="#7000FF"
        mask="url(#prefix__a)"
      />
    </Svg>
  )
}

export const Slime = () => {
  return (
    <Svg
      width={500}
      height={120}
      viewBox="0 0 375 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M374.5 0H0v75c1.5 1.667 8.5-14.8 24.5-26 20-14 44.806-6.355 63.5 5.5 20.5 13 41 58.5 82 20.5s63-45 76-30 30 39 66.5 36.5c29.2-2 58.333-32 62-45V0z"
        fill="#7000FF"
      />
      <Path
        d="M374.5 0H0v75c1.5 1.667 8.5-14.8 24.5-26 20-14 44.806-6.355 63.5 5.5 20.5 13 41 58.5 82 20.5s63-45 76-30 30 39 66.5 36.5c29.2-2 58.333-32 62-45V0z"
        fill="url(#prefix__paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={187.25}
          y1={0}
          x2={187}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.12} stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.74} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
