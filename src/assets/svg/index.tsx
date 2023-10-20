import React from 'react'

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext)

try {
  importAll(require.context('./', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

interface IIconProps {
  name: string
  className?: string
}

const Icon: React.FC<IIconProps & IObjectProps > = props => {
  return (
    <svg {...props} className={`svg-icon ${props.className ? props.className : ''}`}>
      <use xlinkHref={'#' + props.name} />
    </svg>
  )
}

export default Icon
