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
      this.status({ fill: "green", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

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

      if (msg.sheet) {
        params.sheet = msg.sheet;
      }

      store.read(config.sheet, params).then(data => {
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] connected" });
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
      this.status({ fill: "green", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

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

      if (msg.sheet) {
        params.sheet = msg.sheet;
      }

      params.search = msg.payload;

      store.read(config.sheet, params).then(data => {
        console.log("params", params);
        this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] connected" });
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
      this.status({ fill: "green", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      store
        .append(config.sheet, msg.payload)
        .then(res => {
          // console.log(res);
          this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] connected" });
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
      this.status({ fill: "green", shape: "ring", text: "[" + this.current_setting.name + "] connecting..." });

      const store = new SteinStore(
        this.apiurl
      );

      var params = {};

      if (msg.sheet) {
        params.sheet = msg.sheet;
      }

      params.condition = msg.payload.condition;
      params.set = msg.payload.set;

      store
        .edit(config.sheet, params)
        .then(res => {
          // console.log(res);
          this.status({ fill: "green", shape: "dot", text: "[" + this.current_setting.name + "] connected" });
          msg.payload = res;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("stein-updaterows", SteinUpdateRowsToSheet, {

  });
}