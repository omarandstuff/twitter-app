import React from 'react'

interface LayoutProps {
  loading: boolean
}

export default function Layout(props: React.PropsWithChildren<LayoutProps>): React.ReactElement {
  return (
    <div className="layout">
      {props.loading ? (
        <div className="loading">
          <span>Loading</span>
        </div>
      ) : (
        <div className="content">{props.children}</div>
      )}
    </div>
  )
}
