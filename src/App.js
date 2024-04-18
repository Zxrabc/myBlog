


import {useRoutes} from 'react-router-dom'
import routes from './routes'


function App() {

  const element = useRoutes(routes)

  return (
    <div >
      {/* 注册路由 */}
      {element}
    </div>
  );
}

export default App;
