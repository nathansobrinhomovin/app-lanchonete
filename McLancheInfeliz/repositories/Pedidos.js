import {openDatabase, } from 'react-native-sqlite-storage';
import store from '../redux/store';

const url = 'https://mobile-feso-api.herokuapp.com/api/pedido';

export default class PedidosRepository {
  getAll(onSuccess, onError) {
    return fetch(url + "/", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getState().data.token,
      },
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

  get(pedido, onSuccess, onError) {
    return fetch(url + "/" + pedido.id, {
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

  post(pedido, onSuccess, onError) {
    return fetch(url + '/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getState().data.token,
      },
      body: JSON.stringify({
        mesa: pedido.mesa,
        status: pedido.status,
        valor: pedido.total,
        nomeCliente: pedido.nome_cliente,
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

  put(pedido, onSuccess, onError) {
    return fetch(url + '/' + pedido.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getState().data.token,
      },
      body: JSON.stringify({
        nomeCliente: pedido.nomeCliente,
        mesa: pedido.mesa,
        status: pedido.status,
        valor: pedido.valor,
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

  delete(pedido, onSuccess, onError) {
    return fetch(url + "/" + pedido.id, {
      method: 'DELETE',
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
  /*
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
  }*/
}