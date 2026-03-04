const { React, useNavigate, useStore } = window

function NewAuthorFlow() {
  const navigate = useNavigate()
  const { flow, setFlow, verifyInviteCode, submitAuthorInfo, submitRealNameAuth } = useStore()
  const [inviteCode, setInviteCode] = React.useState('')
  const [penName, setPenName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [intro, setIntro] = React.useState('')
  const [realName, setRealName] = React.useState('')
  const [idNumber, setIdNumber] = React.useState('')
  const [error, setError] = React.useState('')

  const handleInviteCodeSubmit = (e) => {
    e.preventDefault()
    if (!inviteCode) {
      setError('请输入邀请码')
      return
    }
    verifyInviteCode(inviteCode)
  }

  const handleAuthorInfoSubmit = (e) => {
    e.preventDefault()
    
    if (!penName) {
      setError('请填写笔名')
      return
    }
    
    if (!contact) {
      setError('请填写联系方式')
      return
    }
    
    if (!intro) {
      setError('请填写作家简介')
      return
    }
    
    submitAuthorInfo({ penName, contact, intro })
  }

  const handleRealNameSubmit = (e) => {
    e.preventDefault()
    
    if (!realName) {
      setError('请填写真实姓名')
      return
    }
    
    if (!idNumber) {
      setError('请填写身份证号')
      return
    }
    
    submitRealNameAuth({ realName, idNumber })
  }

  const handleComplete = () => {
    navigate('/dashboard')
  }

  const renderStep = () => {
    switch (flow.currentStep) {
      case 1:
        return React.createElement('div', { className: 'space-y-6' },
          React.createElement('h2', { className: 'text-xl font-semibold text-center' }, '新作者流程'),
          React.createElement('div', { className: 'text-center text-gray-600 mb-6' },
            React.createElement('p', null, '您是新作者，需要完成注册流程')
          ),
          React.createElement('div', { className: 'flex space-x-4 justify-center' },
            React.createElement('button', {
              onClick: () => setFlow({ hasInviteCode: true, currentStep: 1.5 }),
              className: 'px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90'
            }, '有邀请码'),
            React.createElement('button', {
              onClick: () => setFlow({ hasInviteCode: false, currentStep: 4 }),
              className: 'px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
            }, '没有邀请码（公域）')
          )
        )
      
      case 1.5:
        return React.createElement('form', { onSubmit: handleInviteCodeSubmit, className: 'space-y-6' },
          React.createElement('h2', { className: 'text-xl font-semibold text-center' }, '填写邀请码'),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'inviteCode', className: 'block text-sm font-medium text-gray-700 mb-1' }, '邀请码'),
            React.createElement('input', {
              type: 'text',
              id: 'inviteCode',
              value: inviteCode,
              onChange: (e) => setInviteCode(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请输入邀请码',
              disabled: flow.isSubmitting
            })
          ),
          flow.error && React.createElement('div', { className: 'text-red-500 text-sm' }, flow.error),
          React.createElement('button', {
            type: 'submit',
            disabled: flow.isSubmitting,
            className: `w-full px-4 py-2 bg-primary text-white rounded-md ${flow.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
          }, flow.isSubmitting ? '验证中...' : '验证邀请码')
        )
      
      case 2:
        return React.createElement('form', { onSubmit: handleAuthorInfoSubmit, className: 'space-y-6' },
          React.createElement('h2', { className: 'text-xl font-semibold text-center' }, '填写作者信息'),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'penName', className: 'block text-sm font-medium text-gray-700 mb-1' }, '笔名'),
            React.createElement('input', {
              type: 'text',
              id: 'penName',
              value: penName,
              onChange: (e) => setPenName(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写笔名',
              disabled: flow.isSubmitting
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'intro', className: 'block text-sm font-medium text-gray-700 mb-1' }, '作家简介'),
            React.createElement('textarea', {
              id: 'intro',
              value: intro,
              onChange: (e) => setIntro(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写作家简介',
              rows: 4,
              disabled: flow.isSubmitting
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'contact', className: 'block text-sm font-medium text-gray-700 mb-1' }, '联系方式'),
            React.createElement('input', {
              type: 'text',
              id: 'contact',
              value: contact,
              onChange: (e) => setContact(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写联系方式',
              disabled: flow.isSubmitting
            })
          ),
          error && React.createElement('div', { className: 'text-red-500 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: flow.isSubmitting,
            className: `w-full px-4 py-2 bg-primary text-white rounded-md ${flow.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
          }, flow.isSubmitting ? '提交中...' : '提交信息')
        )
      
      case 3:
        return React.createElement('form', { onSubmit: handleRealNameSubmit, className: 'space-y-6' },
          React.createElement('h2', { className: 'text-xl font-semibold text-center' }, '实名认证'),
          React.createElement('div', { className: 'text-center text-gray-600 mb-4' },
            React.createElement('p', null, '请填写真实信息，用于身份验证')
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'realName', className: 'block text-sm font-medium text-gray-700 mb-1' }, '真实姓名'),
            React.createElement('input', {
              type: 'text',
              id: 'realName',
              value: realName,
              onChange: (e) => setRealName(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写真实姓名',
              disabled: flow.isSubmitting
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'idNumber', className: 'block text-sm font-medium text-gray-700 mb-1' }, '身份证号'),
            React.createElement('input', {
              type: 'text',
              id: 'idNumber',
              value: idNumber,
              onChange: (e) => setIdNumber(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写身份证号',
              disabled: flow.isSubmitting
            })
          ),
          error && React.createElement('div', { className: 'text-red-500 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: flow.isSubmitting,
            className: `w-full px-4 py-2 bg-primary text-white rounded-md ${flow.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
          }, flow.isSubmitting ? '提交中...' : '提交审核')
        )
      
      case 4:
        return React.createElement('form', { onSubmit: handleAuthorInfoSubmit, className: 'space-y-6' },
          React.createElement('h2', { className: 'text-xl font-semibold text-center' }, '填写作者信息'),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'penName', className: 'block text-sm font-medium text-gray-700 mb-1' }, '笔名'),
            React.createElement('input', {
              type: 'text',
              id: 'penName',
              value: penName,
              onChange: (e) => setPenName(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写笔名',
              disabled: flow.isSubmitting
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'contact', className: 'block text-sm font-medium text-gray-700 mb-1' }, '联系方式'),
            React.createElement('input', {
              type: 'text',
              id: 'contact',
              value: contact,
              onChange: (e) => setContact(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写联系方式',
              disabled: flow.isSubmitting
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'intro', className: 'block text-sm font-medium text-gray-700 mb-1' }, '作家简介'),
            React.createElement('textarea', {
              id: 'intro',
              value: intro,
              onChange: (e) => setIntro(e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              placeholder: '请填写作家简介',
              rows: 4,
              disabled: flow.isSubmitting
            })
          ),
          error && React.createElement('div', { className: 'text-red-500 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: flow.isSubmitting,
            className: `w-full px-4 py-2 bg-primary text-white rounded-md ${flow.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`
          }, flow.isSubmitting ? '提交中...' : '提交资料')
        )
      
      case 5:
      case 6:
        return React.createElement('div', { className: 'text-center space-y-6' },
          React.createElement('div', { className: 'text-4xl text-green-500 mb-4' }, '✓'),
          React.createElement('h2', { className: 'text-xl font-semibold' }, '注册完成'),
          React.createElement('p', { className: 'text-gray-600' }, '您已成功完成注册流程'),
          React.createElement('button', {
            onClick: handleComplete,
            className: 'px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90'
          }, '进入后台')
        )
      
      default:
        return null
    }
  }

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-neutral-light' },
    React.createElement('div', { className: 'w-full max-w-md p-8 bg-white rounded-lg shadow-md' },
      renderStep()
    )
  )
}

window.NewAuthorFlow = NewAuthorFlow