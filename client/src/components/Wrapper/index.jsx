import React from 'react'

export const Wrapper = 
  ({ classes, className, style, children, ...props }) => (
    <div
      {...props}
      className={[classes, className || ''].join(' ')}
      style={{
        flex:1,
        marginTop:20,
        marginLeft:65,
        marginRight:65,
        marginBottom:20,

        ...(style || {}),
      }}
    >
      {children}
    </div>
  )

  export const ContentDiv = 
  ({ classes, className, style, children, ...props }) => (
    <div
      {...props}
      className={[classes, className || ''].join(' ')}
      style={{
        marginTop:20,
     

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
        marginTop:20,
        marginBottom:15,
        color: '#383838',
        fontSize: 22,
        fontWeight:'bold',
      }}
    >
      {children}
    </div>
  )
  





