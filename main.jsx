const { React, ReactDOM, BrowserRouter: Router, App } = window

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(Router, null,
      React.createElement(App)
    )
  )
)