export const anavItems = [
  {
    name: 'Dashboard',
    url: '/dash/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Quiz Admin'
  },
  {
    name: 'View Quiz',
    url: '/dash/adminquiz/viewquiz',
    icon: 'icon-drop'
  },
  {
    name: 'Create Quiz',
    url: '/dash/adminquiz/createquiz',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/dash/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/dash/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/dash/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/dash/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/dash/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/dash/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/dash/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/dash/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/dash/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/dash/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/dash/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/dash/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/dash/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/dash/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/dash/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/dash/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/dash/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/dash/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/dash/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/dash/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/dash/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/dash/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/dash/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/dash/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/dash/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/dash/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/dash/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/dash/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/dash/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/dash/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/dash/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/dash/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/dash/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }
];
