import useRouteElements from './useRouteElement'

function App() {
  const routeElement = useRouteElements()

  return <>{routeElement}</>
}

export default App
