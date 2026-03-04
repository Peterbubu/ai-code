const { React, Routes, Route, LoginPage, NewAuthorFlow, AuthorDashboard } = window

function App() {
  return React.createElement('div', { className: 'min-h-screen bg-neutral-light' },
    React.createElement(Routes, null,
      React.createElement(Route, { path: '/', element: React.createElement(LoginPage) }),
      React.createElement(Route, { path: '/new-author', element: React.createElement(NewAuthorFlow) }),
      React.createElement(Route, { path: '/dashboard', element: React.createElement(AuthorDashboard) })
    )
  )
}

window.App = App