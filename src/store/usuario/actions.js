export const setEmailLogado = (context, novoemail) => {
  console.log('ACTION SET TITLE: ' + novoemail)
  context.commit('logar', novoemail)
}
