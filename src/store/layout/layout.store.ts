import { observable, action, makeObservable } from 'mobx'
import { themes, closeType } from '../config/config'
import BaseStore from '../base.store'
import Utils, { KEY } from '@/utils/index'
import ROUTER from '@/router/constant'
import { getMenuApi } from '@/utils/http/api'
import { debounce, throttle } from 'lodash'
import CommonStore from '../common.store'

class LayoutStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable navHeight: number = 40
  @observable isSidebarMini: boolean = false
  @observable layoutType: boolean = false // menu布局方案 false:横向布局  true:竖向布局
  @observable fullScreen: boolean = false
  @observable themes: Array<object> = themes
  @observable currentTheme = 'theme-gray'
  @observable toolShow = false
  @observable needArrow = false // tab nav 子元素超过父级宽度，需要在首尾展示按钮

  private defaultBread = '首页'
  @observable breadCrumbsList = ['Dashboard', this.defaultBread] // 面包屑
  @observable storage: object = {}
  @observable navItemInit: NavItem = {
    id: '0_1',
    parentId: '0',
    name: 'Dashboard',
    active: true,
    height: 40,
    url: ROUTER.MONITOR,
    needClose: false, // 不允许关闭
  }
  @observable navItems: Array<NavItem> = [] // 导航tab 存储 选择过的菜单
  @observable navItemsLimit: number = 25 // 导航tab 存储个数限制
  @observable navActiveItemCache: NavItem | null = null // 缓存当前选中的页面路由信息 刷新页面回显使用
  @observable navConfig: Array<Menu> = []
  @observable info: any = {}

  // nav 动态滚动
  @observable navItemsWrapDom: HTMLElement | null = null // nav wrap dom
  @observable navItemsDom: HTMLElement | null = null // navitems dom
  @observable currentNavChildOffset: number = 0 // 当前nav offset的值step
  @observable navChildOffsetStep: number = 150 // nav箭头点击滚动的距离
  @observable navItemsWrapWidth: number = 0 // navItemswrap 元素的长度
  @observable navItemsWidth: number = 0 // navItems 元素的长度

  /**
   * layout 初始化
   */
  @action
  layoutInitHandle = async () => {
    // 获取菜单数据
    await this.getMenu()
    // 获取 layout 配置信息
    this.getDataFromStorage()

    // 刷新记住数据
    window.addEventListener('beforeunload', this.setDataToStorage)

    // 全屏缩小
    window.addEventListener('resize', this.resizeListenerHandler)

    // 禁止浏览器默认右击
    window.oncontextmenu = (e: any) => {
      e.preventDefault()
    }

    // 检测 是否需要展示nav箭头
    this.tabNavCalculationLengthHandle()
  }

  /**
   * 获取菜单数据
   */
  @action
  getMenu = () => {
    return new Promise(resolve => {
      let userid = Utils.getLocal(KEY.USERID)
      getMenuApi(userid).then(
        action((res: any) => {
          if (!res || !res.result) return
          this.navConfig = res.result.menuList
          this.info = res.result.user
          Utils.setLocal(KEY.USERINFO, res.result.user)
          resolve(true)
        })
      )
    })
  }

  @action
  changeSidebarWidth = () => {
    this.isSidebarMini = !this.isSidebarMini
  }

  /**
   * 左侧菜单栏 选中事件
   * @param currentUrl 选中的menu 对象
   */
  @action
  changeMenuLinkActive = (currentUrl: NavItem) => {
    if (!currentUrl) return

    this.navActiveItemCache = currentUrl
    const length = this.navConfig.length || 0
    const curIndex = this.navConfig.findIndex(item => currentUrl.id === item.id)

    // 如果是父级，不存在url,只需要打开子菜单，不排他
    if (!currentUrl.parentId && !currentUrl.url) {
      // mini 菜单模式下，不需要父菜单点击事件
      if (this.isSidebarMini) return

      const item = this.navConfig[curIndex]

      // 过渡动画 有子级打开
      if (item && item.child && item.child.length) {
        // 改变父级菜单状态，并打开子菜单
        item.active = !item.active
        item.height = item.active ? this.navHeight * (item.child.length + 1) : this.navHeight
      }
    }

    // 没有子级的一级菜单，直接选中，并排他
    if (!currentUrl.parentId && currentUrl.url) {
      for (let i = 0; i < length; i++) {
        // @ts-ignore
        const item: NavItem = this.navConfig[i]

        if (currentUrl.id === item.id) {
          item.active = true
        } else {
          item.active = false
          item.height = this.navHeight
          item.child &&
            item.child.length &&
            item.child.forEach((childItem: any) => {
              childItem.active = false
            })
        }
      }
    }

    // 父级下子菜单 点击处理
    if (currentUrl.parentId) {
      // 二级菜单
      this.navConfig.forEach(
        action((item: NavItem) => {
          if (item.id === currentUrl.parentId) {
            // 如果是顶部导航直接选中子级，要自动打开menu
            item.active = true
            item.height = item.active ? this.navHeight * (item.child.length + 1) : this.navHeight
            // 状态选中
            item.child &&
              item.child.length &&
              item.child.forEach((childItem: any) => {
                childItem.active = childItem.id === currentUrl.id
              })
          } else {
            // 点击的第二级,其他打开的menu需要关闭
            // 取消状态
            item.active = false
            // 关闭
            item.height = this.navHeight
            item.child &&
              item.child.length &&
              item.child.forEach((childItem: any) => {
                childItem.active = false
              })
          }
        })
      )
    }

    // 面包屑导航
    this.breadCrumbs(currentUrl)

    // 增加nav导航
    let param: NavItem = {
      name: currentUrl.name,
      url: currentUrl.url,
      active: true,
      parentId: currentUrl.parentId || '',
      child: currentUrl.child || [],
      id: currentUrl.id || '',
      height: currentUrl.height || 40,
    }
    this.saveNavURL(param)
  }

  /**
   * 取缓存
   */
  @action
  getDataFromStorage = () => {
    let data: Array<Menu> = Utils.getLocal(KEY.NAVCONFIG)

    if (!data) return

    for (var k in data) {
      if (!data[k]) continue

      //@ts-ignore
      this[k] = data[k]
    }

    // 设置主题
    this.setThemeHandle()

    // 回显选中的菜单
    this.navActiveItemCache && this.changeMenuLinkActive(this.navActiveItemCache)
  }

  /**
   * 设置缓存
   */
  @action
  setDataToStorage = () => {
    // 刷新后需要回显的数据都保存起来
    const data = {
      navActiveItemCache: this.navActiveItemCache,
      currentTheme: this.currentTheme,
      navItems: this.navItems,
      breadCrumbsList: this.breadCrumbsList,
      lang: this.lang,
      layoutType: this.layoutType,
      isSidebarMini: this.isSidebarMini,
    }

    Utils.setLocal(KEY.NAVCONFIG, data)
  }

  @action
  requestFullScreen = () => {
    this.fullScreen = true
    var docElm = document.documentElement
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    }
  }

  @action
  exitFullscreen = () => {
    this.fullScreen = false
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  @action
  logOut = () => {
    // 初始化
    this.initLayoutConfig()
  }

  @action
  initLayoutConfig = () => {
    // 删除本地导航缓存
    Utils.removeLocal(KEY.NAVCONFIG)
    // 初始化
    this.navItems = [] // 导航
    this.breadCrumbsList = ['Dashboard', this.defaultBread] // 面包屑导航
    // 删除 监听事件
    this.setDataToStorage && window.removeEventListener('beforeunload', this.setDataToStorage)
    this.resizeListenerHandler && window.removeEventListener('resize', this.resizeListenerHandler)
  }

  /**
   * 窗口resize
   */
  @action
  resizeListenerHandler = debounce(
    action(() => {
      let isFull: boolean = !!document.fullscreenElement
      if (!isFull) {
        this.fullScreen = false
      }
      // 检测 是否需要展示nav箭头
      this.tabNavCalculationLengthHandle()
      // 动态调整nav
      this.navAnimateLastToView()
    }),
    300
  )

  /**
   * 工具栏show/hide
   */
  @action
  showTool = (flag?: boolean) => {
    if (flag === false) {
      if (!this.toolShow) return
      this.toolShow = flag
      return
    }
    this.toolShow = !this.toolShow
  }

  /**
   * 切换主题色
   */
  @action
  changeTheme = (theme: any) => {
    this.themes.forEach((item: any) => {
      item.active = item.name === theme.name
    })
    this.currentTheme = theme.name
    // 动态更换主题
    this.setThemeHandle()
  }

  /**
   * 更换主题
   */
  setThemeHandle = () => {
    const rootDom = document.getElementById('root')
    rootDom?.setAttribute('data-theme', this.currentTheme)
  }

  /**
   * 切换布局
   */
  @action
  changeLayoutType = (layoutType: boolean) => {
    if (layoutType === null || layoutType === undefined) return
    this.layoutType = layoutType
  }

  /**
   * 切换语言
   * @param lang
   */
  @action
  changeLang = (lang: string) => {
    this.lang = lang
    Utils.setLocal(KEY.LANGUAGE, lang)
    this.globalSuccess({ content: this.getLanguageMess('10016'), duration: 0.5 })
  }

  /**
   * 新增nav导航
   * @param nav
   */
  @action
  saveNavURL = (nav: NavItem) => {
    if (!nav?.url && !nav?.menuType) return
    // 查看navItem中是否存在过了，不存在 添加
    let list: NavItem | undefined = this.navItems.find(item => item.name === nav.name)

    if (!list) {
      this.navItems.forEach(item => {
        item.active = false
      })

      // 检查是否超出限制个数
      if (this.navItems.length >= this.navItemsLimit) {
        // 删除第一位后再添加
        this.navItems.shift()
      }

      // 限制位以内 直接添加
      this.navItems.push(nav)
      // 动态处理nav 是否展示箭头
      this.tabNavCalculationLengthHandle()
      this.navAnimateLastToView()
      return
    }

    // 存在 直接找到存在项将active改为true；
    const navItems: Array<NavItem> = this.navActiveExclusive(nav)

    this.navItems = navItems

    this.tabNavCalculationLengthHandle()
    // 点击菜单联动nav的动画处理
    this.navActiveItemAnimate(nav.id)
  }

  /**
   * active 排他
   * @param nav
   */
  navActiveExclusive = (nav: NavItem) => {
    return this.navItems.map(item => {
      item.active = item.name === nav.name
      return item
    })
  }

  /**
   * 删除导航
   * @param nav
   * @param history 组件的history对象，跳转页面
   */
  @action
  closeTabNavCurrent = (nav: NavItem, history: any) => {
    // 找到下标
    const index: number = this.navItems.findIndex(item => item.name === nav.name)

    // 非active的页面直接 删除
    this.navItems.splice(index, 1)
    // 动态处理nav 是否展示箭头
    this.tabNavCalculationLengthHandle()
    // this.navAnimateLastToView()

    if (!nav.active) return

    // 最后一个导航关闭,回到Dashboard页
    if (this.navItems.length < 1) {
      history.push(ROUTER.MONITOR)
      // 面包屑
      this.breadCrumbsList = ['Dashboard', this.defaultBread]
      // menu选中对应的
      let menu = this.navConfig.filter((item: any) => item.id === '0')[0]
      this.changeMenuLinkActive(menu)
      // 动态处理nav 是否展示箭头
      this.tabNavCalculationLengthHandle()
      // this.navAnimateLastToView()
      return
    }

    // 关闭项后面还有页面，用后面页面代替
    let item = this.navItems[index]

    if (!item) {
      // 后面没有，关闭当前，页面跳到前一个
      item = this.navItems[index - 1]
      this.navItems[index - 1] = Object.assign({}, item, { active: true })
      history.push(item.url)
      // 联动面包屑
      this.breadCrumbs(item)
      // 左侧菜单栏
      this.changeMenuLinkActive(item)
      // 动态处理nav 是否展示箭头
      this.tabNavCalculationLengthHandle()
      // this.navAnimateLastToView()
      return
    }

    // 如果删除的是active的页面，active用下一个元素代替且跳到相应的页面
    this.navItems[index] = Object.assign({}, item, { active: true })
    history.push(item.url)
    // 联动面包屑
    this.breadCrumbs(item)
    // 左侧菜单栏
    this.changeMenuLinkActive(item)
    // 动态处理nav 是否展示箭头
    this.tabNavCalculationLengthHandle()
    //  this.navAnimateLastToView()
  }

  /**
   * tab导航 右键删除功能
   * @param type 关闭的类型
   * @param id 当前tab id
   * @param history 路由history对象
   */
  @action
  closeTabNavHandle = (
    type: 'all' | 'right' | 'refresh' | 'other',
    currentNav: NavItem,
    history: any
  ) => {
    switch (type) {
      case closeType.refresh:
        // 刷新页面
        window.location.reload()
        break

      case closeType.right:
        // 关闭右侧
        const currentIndex = this.navItems.findIndex((item: NavItem) => item.id === currentNav.id)
        if (currentIndex === -1) return
        const length = this.navItems.length
        const deletedNavlist = this.navItems.slice(currentIndex + 1, length)

        this.navItems.splice(currentIndex + 1, length)
        // 如果关闭的tab中有active的tab,需要把active状态给到当前tab
        const haveActive = !!(
          deletedNavlist.length && deletedNavlist.find((item: NavItem) => item.active)
        )
        if (!haveActive) return

        // 同步菜单 和面包屑导航
        history.replace(currentNav.url)
        this.breadCrumbs(currentNav)
        this.changeMenuLinkActive(currentNav)
        break

      case closeType.other:
        // 关闭其他
        history.replace(currentNav.url)
        this.navItems = [this.navItemInit, currentNav]
        this.changeMenuLinkActive(currentNav)

        break

      case closeType.all:
        // 关闭全部 页面回到初始页Dashboard
        this.navItems = [this.navItemInit]
        history.replace(this.navItemInit.url)
        // 同步菜单 和面包屑导航
        this.breadCrumbs(this.navItemInit)
        this.changeMenuLinkActive(this.navItemInit)
        break
    }

    // 动态处理nav 是否展示箭头
    this.tabNavCalculationLengthHandle()
  }

  /**
   * 点击导航item 跳转
   * @param nav
   * @param history 组件的history对象，跳转页面
   */
  @action
  navItemClick = (nav: NavItem, history: any) => {
    // 跳页面
    history.push(nav.url)
    // active 排他
    const navItems: Array<NavItem> = this.navActiveExclusive(nav)
    this.navItems = navItems
    // 联动 面包屑
    this.breadCrumbs(nav)
    // 联动 左侧菜单栏
    this.changeMenuLinkActive(nav)
    // 联动 箭头显示逻辑
    this.tabNavCalculationLengthHandle()
  }

  /**
   * 面包屑导航
   * @param nav
   */
  @action
  breadCrumbs = (nav: NavItem) => {
    // 子级的面包屑 三级
    if (nav.parentId) {
      let parentNode: any = this.navConfig.filter((item: any) => item.id === nav.parentId)
      if (parentNode.length) {
        this.breadCrumbsList = [nav.name, parentNode[0].name, this.defaultBread]
      }
      return
    }
    // 没有子级的 两级
    this.breadCrumbsList = [nav.name, this.defaultBread]
  }

  /**
   * 获取nav 相关dom
   */
  @action
  getNavitemsDom = () => {
    if (!this.navItemsWrapDom || !this.navItemsDom) {
      this.navItemsWrapDom = document.getElementById('navItemsWrap')
      this.navItemsDom = document.getElementById('navItems')
    }
  }

  /**
   * 动态计算 navitems 是否超过父级宽度，显示首尾箭头按钮
   */
  @action
  tabNavCalculationLengthHandle = () => {
    const _this = this
    setTimeout(
      action(() => {
        _this.getNavitemsDom()

        _this.navItemsWrapWidth = _this.navItemsWrapDom?.clientWidth || 0
        _this.navItemsWidth = _this.navItemsDom?.clientWidth || 0
        _this.needArrow = _this.navItemsWrapWidth < _this.navItemsWidth

        if (!_this.navItemsDom) return
        !_this.needArrow && (_this.navItemsDom.style.transform = `translateX(0px)`)
      }),
      0
    )
  }

  /**
   * 有箭头nav，最后一项滚动到可视位置
   */
  navAnimateLastToView = () => {
    const _this = this
    // setTimeout 是为了将代码转成宏任务，
    setTimeout(
      action(() => {
        _this.getNavitemsDom()
        _this.navItemsWrapWidth = _this.navItemsWrapDom?.clientWidth || 0
        _this.navItemsWidth = _this.navItemsDom?.clientWidth || 0

        // 如果箭头存在，新增的nav需要自动滚动到可视范围
        if (_this.needArrow) {
          // 5为navItems margin-right: 5px; TODO 动态计算，
          _this.currentNavChildOffset = 0 - (_this.navItemsWidth - _this.navItemsWrapWidth - 5)
          if (!_this.navItemsDom) return
          _this.navItemsDom.style.transform = `translateX(${_this.currentNavChildOffset}px)`
        }
      }),
      0
    )
  }

  // nav出现箭头的时候，箭头点击事件
  @action
  navArrowHandle = throttle(
    action((type: 'left' | 'right') => {
      this.getNavitemsDom()

      this.navItemsWrapWidth = this.navItemsWrapDom?.clientWidth || 0
      this.navItemsWidth = this.navItemsDom?.clientWidth || 0

      if (!this.navItemsDom) return

      // 左按钮
      if (type === 'left') {
        if (this.currentNavChildOffset + this.navChildOffsetStep > 0) {
          this.currentNavChildOffset = 0
        } else {
          this.currentNavChildOffset += this.navChildOffsetStep
        }
      }

      // 右按钮
      if (type === 'right') {
        // 边界值 5为navItems 的margin-right: 5px;
        const maxLeftWidth = this.navItemsWidth - this.navItemsWrapWidth - 5
        // 已经达到最大滚动边界
        if (this.currentNavChildOffset === -maxLeftWidth) return

        // 边界处理
        if (
          Math.abs(this.currentNavChildOffset - this.navChildOffsetStep) > Math.abs(maxLeftWidth)
        ) {
          this.currentNavChildOffset = -maxLeftWidth
        } else {
          // 正常按照步数滚动
          this.currentNavChildOffset -= this.navChildOffsetStep
        }
      }

      this.navItemsDom.style.transform = `translateX(${this.currentNavChildOffset}px)`
    }),
    300
  )

  /**
   * 点击菜单，联动nav的滚动
   */
  @action
  navActiveItemAnimate = (id: string) => {
    const _this = this
    setTimeout(() => {
      _this.getNavitemsDom()
      _this.navItemsWrapWidth = _this.navItemsWrapDom?.clientWidth || 0
      _this.navItemsWidth = _this.navItemsDom?.clientWidth || 0

      // 拿到当前nav菜单的index
      const index = _this.navItems.findIndex(item => item.id === id)
      // 根据index，拿到元素
      const currentNav = _this.navItemsDom?.childNodes[index] || null
      if (!currentNav) return
      const wrapClient = _this.navItemsWrapDom?.getBoundingClientRect()
      const left = wrapClient?.left || 0
      // @ts-ignore
      const right = wrapClient?.left + wrapClient?.width
      // @ts-ignore
      const clientRect = currentNav.getBoundingClientRect()
      // 判断元素在不在可视区域
      if (clientRect.left < left) {
        // 不在可视区域 动态计算navwrap需要滚动的区域
        _this.currentNavChildOffset = _this.currentNavChildOffset + (left - clientRect.left)
        // @ts-ignore
        _this.navItemsDom.style.transform = `translateX(${_this.currentNavChildOffset}px)`
      }
      if (clientRect.left > right) {
        _this.currentNavChildOffset = 0 - (_this.navItemsWidth - _this.navItemsWrapWidth - 5)
        // @ts-ignore
        _this.navItemsDom.style.transform = `translateX(${_this.currentNavChildOffset}px)`
      }
    }, 0)
  }

  handleToPresonal = () => {
    CommonStore.push(ROUTER.PERSONAL)
    let param: any = {
      name: '个人中心',
      url: ROUTER.PERSONAL,
      active: true,
    }
    this.saveNavURL(param)
    this.breadCrumbs(param)
  }
}

export default new LayoutStore()
