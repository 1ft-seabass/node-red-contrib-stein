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

  function SteinGetData(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', function (msg) {
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

      store.read(sheet, params).then(data => {
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] searched count:" + data.length });
        msg.payload = data;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("stein-get", SteinGetData, {

  });

  function SteinSearchData(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', function (msg) {
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

      store.read(sheet, params).then(data => {
        // console.log("params", params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] searched count:" + data.length});
        msg.payload = data;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("stein-search", SteinSearchData, {

  });

  function SteinAddRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', function (msg) {
      this.status({ fill: "blue", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      let sheet = config.sheet;
      if (msg.sheet) {
        sheet = msg.sheet;
      }

      let data;
      if(Array.isArray(msg.payload)){
        // Array
        data = msg.payload;
      } else {
        // single Object
        data = [ msg.payload ];
      }

      store
        .append(sheet, data)
        .then(res => {
          // console.log(res);
          this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] updatedRange:" + res.updatedRange });
          msg.payload = res;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("stein-addrows", SteinAddRowsToSheet, {

  });

  function SteinUpdateRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', function (msg) {
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

      console.log(params);

      store
        .edit(sheet, params)
        .then(res => {
          // console.log(res);
          this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] totalUpdatedRows:" + res.totalUpdatedRows });
          msg.payload = res;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("stein-updaterows", SteinUpdateRowsToSheet, {

  });

  function SteinDeleteRowsToSheet(config) {

    RED.nodes.createNode(this, config);

    this.current_setting = RED.nodes.getNode(config.apiurl);
    this.apiurl = this.current_setting.credentials.apiurl;

    var node = this;
    node.on('input', function (msg) {
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

      store
        .delete(sheet, params)
        .then(res => {
          // console.log(res);
          this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] clearedRowsCount:" + res.clearedRowsCount });
          msg.payload = res;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("stein-deleterows", SteinDeleteRowsToSheet, {

  });
}