import {openDatabase, } from 'react-native-sqlite-storage';

export default class PedidosRepository {
  DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS pedidos(id INTEGER PRIMARY KEY AUTOINCREMENT, mesa INTEGER UNIQUE NOT NULL, cliente_nome VARCHAR(100))';

  SELECT_ALL = 'SELECT * FROM pedidos';

  SELECT_ONE = 'SELECT * FROM pedidos WHERE id = ?';

  SELECT_MESA = 'SELECT * FROM pedidos WHERE mesa = ?';

  INSERT = 'INSERT INTO pedidos (mesa, cliente_nome) values (?, ?)';

  UPDATE = 'UPDATE pedidos SET mesa = ?, cliente_nome = ? WHERE id = ?';

  DELETE = 'DELETE FROM pedidos WHERE id = ?';

  Retrieve(onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(this.SELECT_ALL, [], onSuccess, onError);
    });
  }

  getOne(pedido ,onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.SELECT_ONE, [pedido.id], onSuccess, onError);
    });
  }

  getMesa(pedido, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.SELECT_MESA, [pedido.mesa], onSuccess, onError);
    });
  }

  Save(pedido, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.INSERT,
        [pedido.mesa, pedido.cliente_nome],
        onSuccess,
        onError,
      );
    });
  }

  Update(pedido, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(
        this.UPDATE,
        [pedido.mesa, pedido.cliente_nome, pedido.id],
        onSuccess,
        onError,
      );
    });
  }

  Delete(pedido, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    db.transaction((transaction) => {
      transaction.executeSql(this.DELETE, [pedido.id], onSuccess, onError);
    });
  }
}