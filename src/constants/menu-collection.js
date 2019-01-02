export const SIDEBAR_MENUS = [
    {name: "Dashboard", icon: "dashboard", url: "/dashboard"},
    {name: "Uptime", icon: "arrow circle up", url: "/uptime"},
    {name: "Monitor", icon: "clock", url: "/monitor"},
    {name: "Integration", icon: "bell outline", url: "/integration"}
]

export const PROTOCOL_OPTIONS = [
    { key: 'http', text: 'http', value: 'http' },
    { key: 'https', text: 'https', value: 'https' }
]

export const FREQUENCY_OPTIONS = [
    { key: '1', text: '1', value: '1', disabled: false },
    { key: '5', text: '5', value: '5', disabled: false },
    { key: '15', text: '15', value: '15', disabled: false },
    { key: '30', text: '30', value: '30', disabled: false }
]

export const UNIT_OPTIONS = [
    { key: 'seconds', text: 'seconds', value: 'second', disabled: false },
    { key: 'minute', text: 'minute', value: 'minute', disabled: false }
]