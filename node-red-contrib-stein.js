const SteinStore = require("stein-js-client");

module.exports = function (RED) {
  function SteinConfig(config) {
    RED.nodes.createNode(this, config);
    var node = this;
  }
  RED.nodes.registerType("stein-config", SteinConfig, {
    credentials: {
      apiurl: { type: "text" }
    }
  });

  function AsyncSteinRead(_store, _sheet, _params){
    return new Promise((resolve, reject) => {
      _store
        .read(_sheet, _params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
  }

  function AsyncSteinAddRows(_store, _sheet, _data){
    return new Promise((resolve, reject) => {
      _store
        .append(_sheet, _data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
  }  

  function AsyncSteinUpdateRows(_store, _sheet, _params){
    return new Promise((resolve, reject) => {
      _store
        .edit(_sheet, _params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
  }

  function AsyncSteinDeleteRows(_store, _sheet, _params){
    return new Promise((resolve, reject) => {
      _store
        .delete(_sheet, _params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
  }

  function SteinGetData(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', async function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      var params = {};

      if (msg.limit) {
        params.limit = msg.limit;
      }

      if (msg.offset) {
        params.offset = msg.offset;
      }
      
      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      try {
        let data = await AsyncSteinRead(store, sheet, params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] count:" + data.length });
        msg.payload = data;
        node.send(msg);
      } catch(error) {
        this.status({ fill: "red", shape: "dot", text: "[" + this.current_setting.name + "] error" });
        node.error(error);
      }
      

    });
  }
  RED.nodes.registerType("stein-get", SteinGetData, {

  });

  function SteinSearchData(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', async function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      var params = {};

      if (msg.limit) {
        params.limit = msg.limit;
      }

      if (msg.offset) {
        params.offset = msg.offset;
      }

      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      params.search = msg.payload;

      try {
        let data = await AsyncSteinRead(store , sheet, params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] count:" + data.length });
        msg.payload = data;
        node.send(msg);
      } catch(error) {
        this.status({ fill: "red", shape: "dot", text: "[" + this.current_setting.name + "] error" });
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("stein-search", SteinSearchData, {

  });

  function SteinAddRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', async function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      let appendData;
      if(Array.isArray(msg.payload)){
        // Array
        appendData = msg.payload;
      } else {
        // single Object
        appendData = [ msg.payload ];
      }

      try {
        let data = await AsyncSteinAddRows(store, sheet, appendData);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] updatedRange:" + data.updatedRange });
        msg.payload = data;
        node.send(msg);
      } catch(error) {
        this.status({ fill: "red", shape: "dot", text: "[" + this.current_setting.name + "] error" });
        node.error(error);
      }

    });
  }
  RED.nodes.registerType("stein-addrows", SteinAddRowsToSheet, {

  });

  function SteinUpdateRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', async function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      var params = {};

      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      params.search = msg.payload.search;
      params.set = msg.payload.set;
      
      try {
        let data = await AsyncSteinUpdateRows(store, sheet, params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] totalUpdatedRows:" + data.totalUpdatedRows });
        msg.payload = data;
        node.send(msg);
      } catch(error) {
        this.status({ fill: "red", shape: "dot", text: "[" + this.current_setting.name + "] error" });
        node.error(error);
      }

    });
  }
  RED.nodes.registerType("stein-updaterows", SteinUpdateRowsToSheet, {

  });

  function SteinDeleteRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', async function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      var params = {};

      if (msg.limit) {
        params.limit = msg.limit;
      }

      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      params.search = msg.payload;

      try {
        let data = await AsyncSteinDeleteRows(store, sheet, params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] clearedRowsCount:" + data.clearedRowsCount });
        msg.payload = data;
        node.send(msg);
      } catch(error) {
        this.status({ fill: "red", shape: "dot", text: "[" + this.current_setting.name + "] error" });
        node.error(error);
      }

    });
  }
  RED.nodes.registerType("stein-deleterows", SteinDeleteRowsToSheet, {

  });
}