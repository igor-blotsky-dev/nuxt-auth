const isAuthenticated = ({ store, redirect }) => {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

export default isAuthenticated
