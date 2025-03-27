import AuthWrapper from '~/app/Libs/SharedUI/AuthWrapper/AuthWrapper'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

const Wrapper = () => {
  return (
    <AuthWrapper hasToBeLogged={true}>
      <Home />
    </AuthWrapper>
  )
}
export default Wrapper