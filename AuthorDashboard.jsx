const { React, useNavigate, useStore } = window

function AuthorDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return React.createElement('div', { className: 'min-h-screen bg-neutral-light' },
    React.createElement('nav', { className: 'bg-white shadow-sm' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'flex justify-between h-16' },
          React.createElement('div', { className: 'flex items-center' },
            React.createElement('h1', { className: 'text-xl font-bold text-primary' }, '创作者后台')
          ),
          React.createElement('div', { className: 'flex items-center' },
            React.createElement('span', { className: 'mr-4 text-gray-600' }, `欢迎，${user.authorInfo.penName || '作者'}`),
            React.createElement('button', {
              onClick: handleLogout,
              className: 'px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
            }, '退出登录')
          )
        )
      )
    ),
    React.createElement('main', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement('div', { className: 'bg-white rounded-lg shadow-md p-6' },
        React.createElement('h2', { className: 'text-xl font-semibold mb-6' }, '作者信息'),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          React.createElement('div', null,
            React.createElement('h3', { className: 'text-lg font-medium mb-4' }, '基本信息'),
            React.createElement('div', { className: 'space-y-3' },
              React.createElement('div', null,
                React.createElement('span', { className: 'text-gray-600' }, '笔名：'),
                React.createElement('span', null, user.authorInfo.penName || '未设置')
              ),
              React.createElement('div', null,
                React.createElement('span', { className: 'text-gray-600' }, '联系方式：'),
                React.createElement('span', null, user.authorInfo.contact || '未设置')
              ),
              React.createElement('div', null,
                React.createElement('span', { className: 'text-gray-600' }, '作家简介：'),
                React.createElement('p', { className: 'mt-1 text-gray-700' }, user.authorInfo.intro || '未设置')
              )
            )
          ),
          React.createElement('div', null,
            React.createElement('h3', { className: 'text-lg font-medium mb-4' }, '实名认证'),
            React.createElement('div', { className: 'space-y-3' },
              React.createElement('div', null,
                React.createElement('span', { className: 'text-gray-600' }, '真实姓名：'),
                React.createElement('span', null, user.authorInfo.realName || '未设置')
              ),
              React.createElement('div', null,
                React.createElement('span', { className: 'text-gray-600' }, '身份证号：'),
                React.createElement('span', null, user.authorInfo.idNumber || '未设置')
              )
            )
          )
        ),
        React.createElement('div', { className: 'mt-8' },
          React.createElement('h3', { className: 'text-lg font-medium mb-4' }, '作品管理'),
          React.createElement('div', { className: 'bg-neutral-light rounded-md p-4 text-center' },
            React.createElement('p', { className: 'text-gray-600' }, '您还没有发布作品')
          )
        )
      )
    )
  )
}

window.AuthorDashboard = AuthorDashboard