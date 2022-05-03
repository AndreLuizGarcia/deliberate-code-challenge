/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { createRoot } from 'react-dom/client'

import Routes from './App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Routes />)
