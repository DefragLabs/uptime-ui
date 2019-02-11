/* global jest */
import React from 'react'

const react_i18next = jest.genMockFromModule('react-i18next')

const translate = () => Component => props => <Component t={(k) => k} {...props} />

react_i18next.translate = translate

module.exports = react_i18next

