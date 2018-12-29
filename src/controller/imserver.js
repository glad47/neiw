layui.define(function(exports) {

	layui.use(['layer', 'jquery',], function() {
		var layer = layui.layer,
			$ = layui.jquery,
			setter = layui.setter;
			
			// message = layui.message,
			// messagebody = layui.messagebody;

		var websocketurl = setter.webSocketUrl;

		var currentsession = layui.data('layuiAdmin').userId+"";
		console.log(currentsession);
		var showmsg, lm;
		var reconnectflag = false; //避免重复连接
		var socket;

		function createWebSocket(url, callbak) {
			try {
				if (!window.WebSocket) {
					window.WebSocket = window.MozWebSocket;
				}
				if (window.WebSocket) {
					console.log('连接websocket:'+url);
					socket = new WebSocket(url);
					socket.binaryType = "arraybuffer";
					callbak();
				} else {
					layer.msg("你的浏览器不支持websocket！");
					//当浏览器不支持websocket时 降级为http模式	  
					// var isClose = false;
					// window.onbeforeunload = function() {
					// 	if (!isClose) {
					// 		return "确定要离开当前聊天吗?";
					// 	} else {
					// 		return "";
					// 	}
					// }
					// window.onunload = function() {
					// 	if (!isClose) {
					// 		Imwebserver.closeconnect();
					// 	}
					// }
					// dwr.engine.setActiveReverseAjax(true);
					// dwr.engine.setNotifyServerOnPageUnload(true);
					// dwr.engine.setErrorHandler(function() {});
					// dwr.engine._errorHandler = function(message, ex) {
					// 	//alert("服务器出现错误");
					// 	//dwr.engine._debug("Error: " + ex.name + ", " + ex.message, true);
					// };
					// Imwebserver.serverconnect();
				}
			} catch (e) {
				reconnect(url, callbak);
			}
		}


		function reconnect(url, callbak) {
			if (reconnectflag) return;
			reconnectflag = true;
			//没连接上会一直重连，设置延迟避免请求过多
			setTimeout(function() {
				createWebSocket(url, callbak);
				reconnectflag = false;
			}, 2000);
		}

		//发送消息
		var sendMsg = function(msg, receiver, group) {
			var message = new proto.Model();
			var content = new proto.MessageBody();
			message.setMsgtype(4);
			message.setCmd(5);
			message.setGroupid(group); //系统用户组
			message.setToken(currentsession);
			message.setSender(currentsession);
			message.setReceiver(receiver); //好友ID
			content.setContent(msg);
			content.setType(0)
			message.setContent(content.serializeBinary())
			socket.send(message.serializeBinary());
		}
		//拉取离线消息
		var showOfflineMsg = function(layim) {
			$.ajax({
				type: "post",
				url: setter.imUrl+"getOfflineMsg",
				data:{receiveUserId:currentsession},
				async: true,
				success: function(data) {
					// var dataObj = eval("(" + data + ")");
					var dataObj = data.data;
					if (dataObj != null && dataObj.length > 0) {
						for (var i = 0; i < dataObj.length; i++) {
							layim.getMessage({
								username: dataObj[i].sendusername,
								avatar: dataObj[i].avatar + "?" + new Date().getTime(),
								id: dataObj[i].sendUser,
								type: "friend",
								content: dataObj[i].content,
								timestamp: dataObj[i].createdate
							});
						}
					}
				}
			});
		}


		showmsg = function(data) {
			console.log(data);
			var msg = eval("(" + data.user + ")");
			var content = eval("(" + data.content + ")");
			var cache = layui.layim.cache();
			var local = layui.data('layim')[cache.mine.id];
			var username = "",
				avatar = "",
				friend = false;
			layui.each(cache.friend, function(index1, item1) {
				layui.each(item1.list, function(index, item) {
					if (item.id == msg.sender) {
						username = item.username;
						avatar = item.avatar;
						return friend = true;
					}
				});
				if (friend) return true;
			});

			if (msg.cmd == 3) {
				if (msg.sender != currentsession) {
					layer.msg(username + "上线了");
					lm.setFriendStatus(msg.getSender(), 'online');
				}
			} else if (msg.cmd == 4) {
				if (msg.sender != currentsession) {
					layer.msg(username + "下线了");
					lm.setFriendStatus(msg.getSender(), 'offline');
				}
			} else if (msg.cmd == 5) {
				//显示非自身消息    
				if (msg.sender != currentsession) {
					var time = (new Date(msg.timeStamp)).getTime();
					//不显示用户组消息
					if (msg.groupId == null || msg.groupId.length < 1) {
						lm.getMessage({
							username: username,
							avatar: avatar + "?" + new Date().getTime(),
							id: msg.sender,
							type: "friend",
							content: content.content,
							timestamp: time
						});
					} else {
						lm.getMessage({
							username: username,
							avatar: avatar + "?" + new Date().getTime(),
							id: msg.groupId,
							type: "group",
							content: content.content,
							timestamp: time
						});
					}
				}
			}
			/* 
			以下代码只适合ie10以上浏览器  无法兼容低版本浏览器
			var  msgmodel =  proto.Model.deserializeBinary(data);  
			var  msgbody = proto.MessageBody.deserializeBinary(msgmodel.getContent()); 
			alert(msgbody.getContent())
			*/

		}



		layui.use('layim', function(layim) {

			//基础配置
			layim.config({

				init: {
					url: setter.imUrl + 'getAllFriend' //接口地址（返回的数据格式见layim文档）
					,
					type: 'get' //默认get，一般可不填
						,
					data: {
						bid: layui.data('layuiAdmin').userId
					} //额外参数 

				}, //获取主面板列表信息
				title: "我的IM",
				notice: true,
				//获取群员接口  请自行实现获取群用户
				members: {
					url: '' //接口地址
						,
					type: 'get' //默认get，一般可不填
						,
					data: {} //额外参数
				},
				//上传图片接口（返回的数据格式见下文）
				uploadImage: {
					url: 'imgupload' //接口地址
						,
					type: 'post' //默认post
				},
				//上传文件接口（返回的数据格式见下文）
				uploadFile: {
					url: 'fileupload' //接口地址
						,
					type: 'post' //默认post
				},
				isAudio: true, //开启聊天工具栏音频
				isVideo: true, //开启聊天工具栏视频
				brief: false,
				min: false,
				isgroup: true,
				voice: false,
				copyright: true,
				msgbox: 'message' //消息盒子页面地址，若不开启，剔除该项即可
					//,find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
					,
				chatLog: 'historymessage' //聊天记录页面地址，若不开启，剔除该项即可
			});

			layim.on('ready', function(res) {
				lm = layui.layim;
				//取得离线消息
				showOfflineMsg(layim);
				layim.setFriendStatus(currentsession, 'online');
			});
			//监听发送消息
			layim.on('sendMessage', function(data) {
				console.log(data);
				var To = data.to;
				var my = data.mine;
				var message = my.content;
				var receiver = To.id + "";
				if ($.trim(currentsession) == '') {
					return;
				}
				if ($.trim(message) == '') {
					layer.msg("请输入要发送的消息!");
					return;
				}
				if (!window.WebSocket) {
					//判断是发送好友消息还是群消息
					if (To.type == "friend") {
						Imwebserver.sendMsg(receiver, message);
					} else {
						Imwebserver.sendGroupMsg(receiver, message);
					}
					return;
				} else {
					if (socket.readyState == WebSocket.OPEN) {
					//判断是发送好友消息还是群消息
					if (To.type == "friend") {
						sendMsg(message, receiver, null)
					} else {
						sendMsg(message, null, receiver)
					}
					}
				}

			});

			layim.on('online', function(status) {
				//console.log(status); //获得online或者hide
				//websocket发送在线或离线消息给好友
			});
			var initEventHandle = function() {
				//收到消息后
				socket.onmessage = function(event) {
					if (event.data instanceof ArrayBuffer) {
						var msg = proto.Model.deserializeBinary(event.data); //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
						var msgCon = proto.MessageBody.deserializeBinary(msg.getContent());
						var cache = layui.layim.cache();
						var local = layui.data('layim')[cache.mine.id];
						var username = "",
							avatar = "/images/0.jpg",
							friend = false;

						console.log(cache);
						layui.each(cache.friend, function(index1, item1) {
							layui.each(item1.list, function(index, item) {
								if (item.id == msg.getSender()) {
									username = item.username;
									avatar = item.avatar;
									return friend = true;
								}
							});
							if (friend) return true;
						});

						//心跳消息
						if (msg.getCmd() == 2) {
							//发送心跳回应
							var message1 = new proto.Model();
							message1.setCmd(2);
							message1.setMsgtype(4);
							socket.send(message1.serializeBinary());
						} else if (msg.getCmd() == 3) {
							//上线
							if (msg.getSender() != currentsession) {
								layer.msg(username + "上线了！");
								layim.setFriendStatus(msg.getSender(), 'online');
							}
						} else if (msg.getCmd() == 4) {
							//下线
							if (msg.getSender() != currentsession) {
								layer.msg(username + "已下线！");
								layim.setFriendStatus(msg.getSender(), 'offline');
							}
						} else {
							//显示非自身消息    
							if (msg.getSender() != currentsession) {
								//不显示用户组消息

								var time = (new Date(msg.getTimestamp())).getTime();
								if (msg.getGroupid() == null || msg.getGroupid().length < 1) {
									lm.getMessage({
										username: username,
										avatar: avatar + "?" + new Date().getTime(),
										id: msg.getSender(),
										type: "friend",
										content: msgCon.getContent(),
										timestamp: time
									});
								} else {
									lm.getMessage({
										username: username,
										avatar: avatar + "?" + new Date().getTime(),
										id: msg.getGroupid(),
										type: "group",
										content: msgCon.getContent(),
										timestamp: time
									});
								}
							}
						}
					} else {
						var data = event.data; //后端返回的是文本帧时触发
					}
				};
				//连接后
				socket.onopen = function(event) {
					var message = new proto.Model();
					var browser = BrowserUtil.info();
					message.setVersion("1.0");
					message.setDeviceid("")
					message.setCmd(1);
					message.setSender(currentsession);
					message.setMsgtype(1);
					message.setFlag(1);
					message.setPlatform(browser.name);
					message.setPlatformversion(browser.version);
					message.setToken(currentsession);
					var bytes = message.serializeBinary();
					socket.send(bytes);

				};
				//连接关闭
				socket.onclose = function(event) {
					layim.setFriendStatus(currentsession, 'offline');
					layer.confirm('您已下线，重新上线?', function(index) {
						reconnect(websocketurl, initEventHandle);
						layer.close(index);
					});
				};
				socket.onerror = function() {
					reconnect(websocketurl, initEventHandle);
				};
			}

			createWebSocket(websocketurl, initEventHandle);
		});


	});

	exports('imserver', {})
});