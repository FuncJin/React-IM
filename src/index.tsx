import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import { initialize } from '@utils/initialize'

ReactDOM.createRoot(document.querySelector('.im-panel') as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

initialize()
