import VueRouter from 'vue-router'
import Axios from 'axios'
import { Validator } from 'vee-validate'

declare module 'vue/types' {
  interface Vue {
    $validator: Validator
  }

  interface VueConstructor {
    router: VueRouter
  }
}

declare namespace Window {
  type api = typeof Axios
}

declare namespace App {
  interface NavigationItem {
    icon?: string
    text: string
    link?: string
    items?: NavigationItem[]
  }
}

export = App
