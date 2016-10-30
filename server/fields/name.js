module.exports = {
  type: String,
  trim: true,
  required: [true, 'O nome é obrigatório!'],
  validate: {
    validator: (v) => {
      return (v !== '' && v !== ' ');
    },
    message: '{VALUE} não pode ser vazio!'
  }
}
