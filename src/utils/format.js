const formatDate = (dataNascimento) => {
  const formatted = dataNascimento.toLocaleString('pt-BR').split(' ')[0].split('-').reverse().join('/')
  return formatted
}

export {
  formatDate
}
