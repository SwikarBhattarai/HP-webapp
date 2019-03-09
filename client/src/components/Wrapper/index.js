import React from 'react'

export const Wrapper = 
  ({ classes, className, style, children, ...props }) => (
    <div
      {...props}
      className={[classes, className || ''].join(' ')}
      style={{
        flex: 1,
        marginTop:50,
        marginLeft:20,
        marginRight:20,

        ...(style || {}),
      }}
    >
      {children}
    </div>
  )

export const Title = ({ children, ...props }) => (
    <div
      {...props}
      style={{
        color: '#383838',
        fontSize: 25,
      }}
    >
      {children}
    </div>
  )
  





