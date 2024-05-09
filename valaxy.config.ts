import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import Inspect from 'vite-plugin-inspect'
// @ts-ignore
import { addonMeting } from 'valaxy-addon-meting'


// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  addons: [
    addonMeting({
      global: true,
      /** @see https://github.com/metowolf/MetingJS */
      props: {
        id: '2049540645',
        server: 'netease',
        type: 'song',
        autoplay: true,
      },
      options: {
        animationIn: true,
      }
    })
  ],

  themeConfig: {
    banner: {
      enable: true,
      title: 'wの小站',
      cloud: {
        enable: true,
      },
    },

    // pages: [
    //   {
    //     name: '我的小伙伴们',
    //     url: '/links/',
    //     icon: 'i-ri-genderless-line',
    //     color: 'dodgerblue',
    //   },
    //   {
    //     name: '喜欢的女孩子',
    //     url: '/girls/',
    //     icon: 'i-ri-women-line',
    //     color: 'hotpink',
    //   },
    // ],

    footer: {
      since: 2023,
      beian: {
        enable: true,
        icp: '待备案后填写备案号',
      },
    },

    colors: {
      primary: 'cyan',
    },

    bg_image: {
      enable: true,
      url: "https://z1.ax1x.com/2023/10/08/pPvtQXV.md.png",
      dark: "https://z1.ax1x.com/2023/10/08/pPvtQXV.md.png",
    },
  },

  unocss: { safelist },


  vite: {
    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    plugins: [Inspect()],
  },
})
