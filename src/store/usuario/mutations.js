
export const logar = (state, email) => {
  console.log('ACTION SET TITLE: ' + email)
  state.logado = true;
  state.usuarioLogado = email
}

export const logout = (state) => {
  state.logado = false;
  state.usuarioLogado = null
}


