import store from '../redux/store';

const url = 'https://mobile-feso-api.herokuapp.com/api/prato';

export default class PratosRepository {
  getAllFromPedido(pedido, onSuccess, onError) {
    return fetch(url + "/pedido/" + pedido.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getState().data.token,
      }
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }

  post(pedido, prato, onSuccess, onError) {
    return fetch(url + "/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getState().data.token,
      },
      body: JSON.stringify({
        nome : prato.nome,
        preco_unitario: prato.preco_uni,
        quantidade: prato.quantidade,
        pedido_id: pedido.id,
      })
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }

  /*DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS pratos (id INTEGER PRIMARY KEY AUTOINCREMENT, pedido_id INTEGER NOT NULL, prato_nome VARCHAR(100), quantidade INTEGER NOT NULL, preco_uni REAL, preco_total REAL)';

  SELECT_ALL = 'SELECT * FROM pratos';

  SELECT_ONE = 'SELECT * FROM pratos WHERE id = ?';

  SELECT_BY_PEDIDO = 'SELECT * FROM pratos WHERE pedido_id = ?';

  INSERT = 'INSERT INTO pratos (pedido_id, prato_nome, quantidade, preco_uni, preco_total) values (?, ?, ?, ?, ?)';

  UPDATE = 'UPDATE pedidos SET pedido_id=?, prato_nome=?, quatidade=?, preco_uni=?, preco_total=? WHERE pedido_id = ?';

  DELETE = 'DELETE FROM pratos WHERE id = ?';

  Retrieve(onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(this.SELECT_ALL, [], onSuccess, onError);
    });
  }

  getOne(prato ,onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.SELECT_ONE, [prato.id], onSuccess, onError);
    });
  }

  getByPedido(pedido, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.SELECT_BY_PEDIDO, [pedido.id], onSuccess, onError);
    });
  }

  Save(pedido ,prato, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.INSERT,
        [pedido.id, prato.nome, prato.quantidade, prato.preco_uni, prato.total],
        onSuccess,
        onError,
      );
    });
  }
  SaveAll(pedido ,pratos, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    for(let i = 0; i < pratos.length; i++) {
      let prato = pratos[i]
      db.transaction((transaction) => {
        transaction.executeSql(this.CREATE, []);
        transaction.executeSql(
          this.INSERT,
          [pedido.id, prato.nome, prato.quantidade, prato.preco_uni, prato.total],
          onSuccess,
          onError,
        );
      });
    }
  }
  Update(pedido, prato, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(
        this.UPDATE,
        [pedido.id, prato.nome, prato.quantidade, prato.preco_uni, (prato.quantidade * prato.preco_uni), prato.id],
        onSuccess,
        onError,
      );
    });
  }

  Delete(prato, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.DELETE, [prato.id], onSuccess, onError);
    });
  }*/
}