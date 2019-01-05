export const SIDEBAR_MENUS = [
    {name: "Dashboard", icon: "dashboard", url: "/dashboard"},
    {name: "Uptime", icon: "arrow circle up", url: "/uptime"},
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

export const MONITORING_URL_RESULTS_FILTER = [
    { key: '1-hour', text: 'Last 1 Hour', value: '1-hour' },
    { key: '3-hour', text: 'Last 3 Hour', value: '3-hour' },
    { key: '6-hour', text: 'Last 6 Hour', value: '6-hour' },
    { key: '1-day', text: 'Last 1 Day', value: '1-day' },
    { key: '1-week', text: 'Last 1 Week', value: '1-week' },
    { key: '1-year', text: 'Last 1 Year', value: '1-year' }
]