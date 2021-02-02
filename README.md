# node-red-contrib-stein

The Node node-red-contrib-stein creates task items using Stein API.

This is simple node for Stein API.

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

## Example

In these example, continue to use the usage sheet data.

![image](https://i.gyazo.com/14d1f0db881f862139f76c1370f2011e.png)

### Search

It searches ID:1 and gets the row data.

![image](https://i.gyazo.com/a693fd810ed47e5f8307209825f9cb82.png)

Like this.

![image](https://i.gyazo.com/5d39c7a0edac90976067ef404cfb4d2a.png)

Sample flow for search rows.

```js
[{"id":"2f4fa1e3.fb4dce","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":260,"y":380,"wires":[["2e1b2bab.3bf494"]]},{"id":"d461f009.a268a","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":930,"y":380,"wires":[]},{"id":"2e1b2bab.3bf494","type":"change","z":"dd89b5b.4441e48","name":"search ID:1","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"ID\":\"1\"}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":380,"wires":[["e431043c.b31448"]]},{"id":"e431043c.b31448","type":"stein-search","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"dd66eff1.2481c","x":710,"y":380,"wires":[["d461f009.a268a"]]},{"id":"2bb0e1c4.09a60e","type":"comment","z":"dd89b5b.4441e48","name":"Search","info":"","x":210,"y":340,"wires":[]},{"id":"dd66eff1.2481c","type":"stein-config","z":"","name":"Sample API"}]
```

The detail of this node usage see the node information.

### Add Rows

It adds rows.

* `add 2 rows (array)` change node.
  * This sample add multiple row data as array.
* `add 1 row (object)` change node.
  * This sample add 1 row data as object.

![image](https://i.gyazo.com/ea3942f7b4e7e4858798fe230d6d17d0.png)

`add 1 row (object)` sample worked like this. It added 1 row data as object.

![image](https://i.gyazo.com/e0ae9b4feed1e59a41b9b4b1520dcfd5.png)

Sample flow for add rows.

```js
[{"id":"b2ee304c.706ab","type":"stein-addrows","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"dd66eff1.2481c","x":740,"y":380,"wires":[["b06abc1f.d6f0d"]]},{"id":"32f62e3e.f720c2","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":380,"wires":[["8d5f601b.011d7"]]},{"id":"8d5f601b.011d7","type":"change","z":"dd89b5b.4441e48","name":"add 2 rows (array)","rules":[{"t":"set","p":"payload","pt":"msg","to":"[{\"ID\":\"5\",\"Name\":\"E\",\"Age\":\"55\"},{\"ID\":\"6\",\"Name\":\"F\",\"Age\":\"66\"}]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":470,"y":380,"wires":[["b2ee304c.706ab"]]},{"id":"b06abc1f.d6f0d","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":950,"y":380,"wires":[]},{"id":"91a2a69.56b7858","type":"comment","z":"dd89b5b.4441e48","name":"Add Rows","info":"","x":240,"y":340,"wires":[]},{"id":"4dccf9ea.2a9948","type":"stein-addrows","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"dd66eff1.2481c","x":740,"y":440,"wires":[["3a9493da.90ecbc"]]},{"id":"fccecb70.33a648","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":440,"wires":[["2abff338.50722c"]]},{"id":"2abff338.50722c","type":"change","z":"dd89b5b.4441e48","name":"add 1 row (object)","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"ID\":\"5\",\"Name\":\"E\",\"Age\":\"55\"}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":470,"y":440,"wires":[["4dccf9ea.2a9948"]]},{"id":"3a9493da.90ecbc","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":950,"y":440,"wires":[]},{"id":"dd66eff1.2481c","type":"stein-config","z":"","name":"Sample API"}]
```

The detail of this node usage see the node information.

### Update Row

It searches ID:5 and updates the row data Age:12.

![image](https://i.gyazo.com/c2bd0b15555e9569371e86569f9be8cd.png)

After Add Rows sample, like this. The sample updated 2 ID:5 rows to Age:12.

![image](https://i.gyazo.com/78c9771b2fc18595d834b08882e4f56b.png)

Sample flow for update row.

```js
[{"id":"149255d9.32cd7a","type":"stein-updaterows","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"dd66eff1.2481c","x":730,"y":640,"wires":[["7e903643.2df8d8"]]},{"id":"7e903643.2df8d8","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":930,"y":640,"wires":[]},{"id":"73469a33.1652c4","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":260,"y":640,"wires":[["6c49017.1db09"]]},{"id":"6c49017.1db09","type":"change","z":"dd89b5b.4441e48","name":"update search ID:5 set Age:12","rules":[{"t":"set","p":"payload","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"payload.search","pt":"msg","to":"{\"ID\":\"5\"}","tot":"json"},{"t":"set","p":"payload.set","pt":"msg","to":"{\"Age\":\"12\"}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":640,"wires":[["149255d9.32cd7a"]]},{"id":"5807a984.3cd0c8","type":"comment","z":"dd89b5b.4441e48","name":"Update Rows","info":"","x":230,"y":600,"wires":[]},{"id":"dd66eff1.2481c","type":"stein-config","z":"","name":"Sample API"}]
```

The detail of this node usage see the node information.

### Delete

It searches ID:5 and deletes the row data. In default, its delete limit is 1. 

![image](https://i.gyazo.com/e9bb1ce21566c18489624385eb0dabf6.png)

Like this. It deleted only one ID:5 row.

![image](https://i.gyazo.com/8d78651152419aa526dd4d9b7d471a7d.png)

Sample flow for delete row.

```js
[{"id":"5e9537b7.050458","type":"stein-deleterows","z":"dd89b5b.4441e48","name":"","sheet":"Sheet1","apiurl":"dd66eff1.2481c","x":720,"y":720,"wires":[["e325bfe9.1b344"]]},{"id":"22b88617.0c51ca","type":"inject","z":"dd89b5b.4441e48","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":260,"y":720,"wires":[["f6ca3915.d8a318"]]},{"id":"f6ca3915.d8a318","type":"change","z":"dd89b5b.4441e48","name":"delete ID:5","rules":[{"t":"set","p":"payload","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"payload","pt":"msg","to":"{\"ID\":\"5\"}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":720,"wires":[["5e9537b7.050458"]]},{"id":"e325bfe9.1b344","type":"debug","z":"dd89b5b.4441e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":930,"y":720,"wires":[]},{"id":"bb99b592.4ad848","type":"comment","z":"dd89b5b.4441e48","name":"Delete Rows","info":"","x":230,"y":680,"wires":[]},{"id":"dd66eff1.2481c","type":"stein-config","z":"","name":"Sample API"}]
```

The detail of this node usage see the node information.

## History

* v0.0.10
  * Added examples at README.md.
* v0.0.9
  * Added each error handling.
  * In using stein-js-client changed Promise "then" to wrapped await/async.
* v0.0.7 - 0.0.8
  * Improved node status to display the detail.
  * Improved node status when connecting color.
  * Changed delete API main param from `payload.search` to `payload`.
    * If needed param is one value, It's assign one value directly to the payload as possible as it can for now.
* v0.0.5 - v0.0.6
  * Fixed stein-js-client version.
  * The node mistook stein-js-client version between v0.0.3 to v0.0.5. 
* v0.0.4
  * Added delete API node.
  * Fixed sheet name behavior.
  * Fixed update API node from `condition` param to `search`.
* v0.0.3
  * First release.

## License

MIT License