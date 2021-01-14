# node-red-contrib-stein

The Node node-red-contrib-stein creates task items using Stein API.

This is simple node for Stein.

## Install

Move your Node-RED user directory ~/.node-red

```
npm i node-red-contrib-stein
```

or

* Go to "Palette Manager" menu on your Node-RED.
* Search "node-red-contrib-stein" on Node-RED Library.
* Click "Install".

## Usage

### Prepare your Google Sheet

Create the simple sheet contained `ID`, `Name` and `Age`.

![image](https://i.gyazo.com/14d1f0db881f862139f76c1370f2011e.png)

### Prepare your Stein API URL

Create `New API from Sheet` using this Google Sheet. Copy created `API URL`.

![image](https://i.gyazo.com/69ecee83527b35f1515b31928677168a.png)

### Sample flow for getting datas:

```js
[{"id":"f9ce75c6.7314b8","type":"stein-get","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"","x":460,"y":120,"wires":[["e2e89214.1c0c5"]]},{"id":"12d9e829.970328","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":260,"y":120,"wires":[["f9ce75c6.7314b8"]]},{"id":"e2e89214.1c0c5","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":650,"y":120,"wires":[]},{"id":"cd36427a.414a8","type":"comment","z":"dd89b5b.4441e48","name":"Get","info":"","x":210,"y":80,"wires":[]}]
```

Import this flow. This is for getting datas. This flow will get sheet name `Sheet1`.

![image](https://i.gyazo.com/87f72364e04d9ec6ffd9f5ffd88bfbce.png)

![image](https://i.gyazo.com/1d6c9848d341c78d38708d49821bae7d.png)

### Setting Stein API URL

Setting Stein API URL.

![image](https://i.gyazo.com/10330a39c468e6becb5aeeebbd1d7f17.png)

Add new `stein-config`.

![image](https://i.gyazo.com/f9a8e03e1492e2f21f0ace5b08463cd2.png)

`stein-config` setting.

* API Name
  * Set freely.
* API URL
  * Set copied current Stein API URL.

![image](https://i.gyazo.com/cd0a3e9405c46f0cbecdf2cd1156ce92.png)

### Click inject node

The Stein get node return status text in the bottom of node when you clicked the inject node.

![image](https://i.gyazo.com/6a354bbc0d5ea9ed44e05a8ca66cee28.png)

The node will return Sheet rows data this to the debug node.

![image](https://i.gyazo.com/85b70ea66cc52a3d7ad8bdd851a15371.png)

## History

* v 0.0.3
  * First release

## License

MIT License