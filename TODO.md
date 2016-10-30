# To Do

Vou utilizar como padrão de código o [Standard](http://standardjs.com/), logo teremos que refatorar:

- não utilização do `;`
- definição de variáveis sendo 1 por linha

Por exemplo como está:

```js
'use strict';

let mongoose            = require('../../config/MongooseConfig.js'),
    schema              = require('./schema');

let CustomerRepository  = mongoose.model('Customer', schema);

module.exports = CustomerRepository;
```

Como deve ficar:

```js
const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const name = 'Customer'

const Repository  = mongoose.model(name, schema)

module.exports = Repository
```

*ps: com as versões mais novas do Node os módulos já trabalham em strict!*

> Percebeu que eu coloquei o `'Customer'` na `const name`?

Fiz isso para ficar mais fácil e rápido de criar outros arquivos como esse, assim:

```js
const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const name = 'Order'

const Repository  = mongoose.model(name, schema)

module.exports = Repository
```

```js
const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const name = 'Product'

const Repository  = mongoose.model(name, schema)

module.exports = Repository
```

Porém ainda podemos deixar mais genérico ainda, basta criarmos o arquivo `config.js` dentro da pasta do módulo e nele teremos, basicamente:

```js
const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const controller = require('./controller')
const routes = require('./routes')
const repository = require('./repository')
const name = __dirname.split('/').reverse()[0] // 'Order'

module.exports = {
  mongoose,
  schema,
  name,
  controller,
  repository,
  routes
}
```

Pois com isso não precisaremos nos preocupar em mudar o caminho ou o nome dos arquivos e ter que alterar em vários outros, precisamos apenas alterar o `config.js`.

Agora olhe como ficou o `repository.js`:

```js
const config = require('./config')
const mongoose = require('mongoose')
const schema = config.schema
const name = config.name

const Repository  = mongoose.model(name, schema)

module.exports = Repository
```

> Dessa forma basicamente **todos os `repository.js` terão esse mesmo código!**

## Arquitetura

### Pastas

Isolar os arquivos de *backend* na pasta `server` e os de *frontend* na pasta `client`, com isso tb migrar os testes cada um para sua pasta.

#### modules

Encapsular todos os arquivos de cada módulo na sua pasta `modules/NomeModulo`.

Dentro dele teremos os arquivos:

- schema.js
- controller.js
- repository.js
- routes.js

### Rotas

Não colocar todas as rotas no mesmo arquivo, se for colocar que seja chamando o arquivo de rota de cada módulo, por exemplo vejamos como está:

```js
router.use('/customers', require('./customers'));
router.use('/orders', require('./orders'));
router.use('/postalcodes', require('./postalcodes'));
router.use('/products', require('./products'));
router.use('/referencePoints', require('./referencePoints'));
```

Nesse caso as rotas de cada módulo estão na mesma pasta e deveriam estar na pasta de cada módulo, por exemplo:

```js
router.use('/customers', require('./../modules/Customers/routes'));
router.use('/orders', require('./../modules/Orders/routes'));
router.use('/postalcodes', require('./../modules/Postalcodes/routes'));
router.use('/products', require('./../modules/Products/routes'));
router.use('/referencePoints', require('./../modules/ReferencePoints/routes'));
```

Porém é mais interessante fazer uma função para ler todos os `routes.js` dentro de `modules/*` e gerar essas rotas para que não precisemos adicioná-las manualmente em nenhum lugar.

### Mongoose
