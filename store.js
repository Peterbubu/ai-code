const { create } = window.Zustand

const useStore = create((set, get) => ({
  // 用户状态
  user: {
    isLoggedIn: false,
    phone: '',
    code: '',
    authorInfo: {
      penName: '',
      contact: '',
      intro: '',
      realName: '',
      idNumber: '',
    }
  },
  
  // 流程状态
  flow: {
    currentStep: 1,
    hasInviteCode: false,
    inviteCode: '',
    isSubmitting: false,
    error: '',
    success: false
  },
  
  // 设置用户信息
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  
  // 设置流程状态
  setFlow: (flow) => set((state) => ({ flow: { ...state.flow, ...flow } })),
  
  // 登录
  login: (phone, code) => {
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: true,
        phone,
        code
      }
    }))
  },
  
  // 登出
  logout: () => {
    set((state) => ({
      user: {
        isLoggedIn: false,
        phone: '',
        code: '',
        authorInfo: {
          penName: '',
          contact: '',
          intro: '',
          realName: '',
          idNumber: '',
        }
      },
      flow: {
        currentStep: 1,
        hasInviteCode: false,
        inviteCode: '',
        isSubmitting: false,
        error: '',
        success: false
      }
    }))
  },
  
  // 验证邀请码
  verifyInviteCode: (code) => {
    set({ flow: { ...get().flow, isSubmitting: true, error: '' } })
    
    // 模拟验证
    setTimeout(() => {
      if (code === '123456') {
        set((state) => ({
          flow: {
            ...state.flow,
            isSubmitting: false,
            hasInviteCode: true,
            inviteCode: code,
            currentStep: 2
          }
        }))
      } else {
        set((state) => ({
          flow: {
            ...state.flow,
            isSubmitting: false,
            error: '邀请码无效'
          }
        }))
      }
    }, 1000)
  },
  
  // 提交作者信息
  submitAuthorInfo: (info) => {
    set({ flow: { ...get().flow, isSubmitting: true, error: '' } })
    
    // 模拟提交
    setTimeout(() => {
      set((state) => ({
        user: {
          ...state.user,
          authorInfo: { ...state.user.authorInfo, ...info }
        },
        flow: {
          ...state.flow,
          isSubmitting: false,
          success: true,
          currentStep: state.flow.hasInviteCode ? 3 : 5
        }
      }))
    }, 1000)
  },
  
  // 提交实名认证
  submitRealNameAuth: (info) => {
    set({ flow: { ...get().flow, isSubmitting: true, error: '' } })
    
    // 模拟提交
    setTimeout(() => {
      set((state) => ({
        user: {
          ...state.user,
          authorInfo: { ...state.user.authorInfo, ...info }
        },
        flow: {
          ...state.flow,
          isSubmitting: false,
          success: true,
          currentStep: 6
        }
      }))
    }, 1000)
  }
}))

window.useStore = useStore