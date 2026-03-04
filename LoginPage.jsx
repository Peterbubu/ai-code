const { React, useNavigate, useStore } = window

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')
  const [countdown, setCountdown] = React.useState(0)

  const handleGetCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的手机号')
      return
    }

    setError('')
    setCountdown(60)
    
    // 模拟发送验证码
    console.log('发送验证码到', phone)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的手机号')
      return
    }

    if (!code) {
      setError('请输入验证码')
      return
    }

    setIsSubmitting(true)
    setError('')

    // 模拟登录/注册
    setTimeout(() => {
      login(phone, code)
      
      // 模拟是否已注册作者
      const isRegisteredAuthor = Math.random() > 0.5
      
      if (isRegisteredAuthor) {
        navigate('/dashboard')
      } else {
        navigate('/new-author')
      }
      
      setIsSubmitting(false)
    }, 1000)
  }

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-neutral-light' },
    React.createElement('div', { className: 'w-full max-w-md p-8 bg-white rounded-lg shadow-md' },
      React.createElement('h1', { className: 'text-2xl font-bold text-center text-gray-800 mb-6' }, '进入创作者后台'),
      React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-6' },
        React.createElement('div', null,
          React.createElement('label', { htmlFor: 'phone', className: 'block text-sm font-medium text-gray-700 mb-1' }, '手机号'),
          React.createElement('div', { className: 'flex space-x-2' },
            React.createElement('input', {
              type: 'tel',
              id: 'phone',
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              className: 'flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请输入手机号',
              disabled: isSubmitting
            }),
            React.createElement('button', {
              type: 'button',
              onClick: handleGetCode,
              disabled: countdown > 0 || isSubmitting || !phone,
              className: `px-4 py-2 bg-primary text-white rounded-md ${countdown > 0 || isSubmitting || !phone ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
            }, countdown > 0 ? `${countdown}s` : '获取验证码')
          )
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: 'code', className: 'block text-sm font-medium text-gray-700 mb-1' }, '验证码'),
          React.createElement('input', {
            type: 'text',
            id: 'code',
            value: code,
            onChange: (e) => setCode(e.target.value),
            className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            placeholder: '请输入验证码',
            disabled: isSubmitting
          })
        ),
        error && React.createElement('div', { className: 'text-red-500 text-sm' }, error),
        React.createElement('button', {
          type: 'submit',
          disabled: isSubmitting,
          className: `w-full px-4 py-2 bg-primary text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
        }, isSubmitting ? '登录中...' : '登录/注册')
      )
    )
  )
}

window.LoginPage = LoginPage