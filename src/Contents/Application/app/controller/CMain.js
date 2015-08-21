App.createOwnCloud = function(o,z) {
	var html=[];
	// create a shortid password
	App.Crypt.createKey(function(key) {
		App.Crypt.encrypt(key,function(newkey) {
			html.push('<div style="padding:10px"><b>Bonjour, Vous êtes '+o.firstname+' '+o.lastname+'</b><br>&nbsp;');
			html.push('<table width=700><tr><td width=150><b>Serveur :</b></td><td><span style="color:blue">https://cloud.cete-mediterranee.i2</span></td></tr></table>');
			html.push('<table width=700><tr><td width=150><b>Utilisateur :</b></td><td><span style="color:blue">'+o.mail.split('@')[0]+'</span></td></tr></table>');
			html.push('<table width=700><tr><td width=150><b>Mot de passe:</b></td><td><span style="color:blue">'+key+'</span> <br><span style="color:red">(A changer à la prochaine connexion)</span></td></tr></table></div>');
			// on met à jour la table user
			App.DB.post('cloudDB://oc_users',{
				uid: o.mail.split('@')[0],
				displayname: o.firstname+' '+o.lastname,
				password: newkey
			},function(r) {
				App.DB.post('cloudDB://oc_group_user', {
					gid: "users",
					uid: o.mail.split('@')[0]
				}, function(r) {
					App.DB.post('cloudDB://oc_preferences', [
					{
						userid: o.mail.split('@')[0],
						appid: "firstrunwizard",
						configkey: "show",
						configvalue: "0"
					},
					{
						userid: o.mail.split('@')[0],
						appid: "files",
						configkey: "quota",
						configvalue: "5 GB"								
					}
					], function(r) {
						App.get('panel#personId').update(html.join(''));
						App.get('panel#step2').setDisabled(false);
						if (z) alert('Votre mot de passe a été changé.');
						App.Mail.send({
							to: o.mail,
							subject: "CEREMACloud: Vos informations de connexion",
							text: [
								"Serveur : https://cloud.cete-mediterranee.i2",
								"UserId	 : "+o.mail.split('@')[0],
								"Mot de passe : "+key
							].join('\n')
						},function() {
							alert('Un mail vient de vous être adressé avec les informations de connexion');
						});
					});
				});
			});
		});
	});
};
App.controller.define('CMain', {

	views: [
		"VMain"
	],
	
	models: [
	],
	
	init: function()
	{
		var me=this;
		
		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"panel#pkg_win": {
				click: function() {
					window.open("/Downloads/ownCloud-1.8.4.5267-setup.exe",'_blank');
				}
			},
			"panel#pkg_osx": {
				click: function() {
					window.open("/Downloads/ownCloud-1.8.4.2531.pkg",'_blank');
				}
			},
			"panel#pkg_x": {
				click: function() {
					window.open("https://software.opensuse.org/download/package?project=isv:ownCloud:desktop&package=owncloud-client",'_blank');
				}
			},
			"panel#pkg_android": {
				click: function() {
					window.open("https://play.google.com/store/apps/details?id=com.cerema.cloud",'_blank');
				}
			},			
			"panel#pkg_ios": {
				click: function() {
					window.open("https://itunes.apple.com/us/app/owncloud/id543672169?ls=1&mt=8",'_blank');
				}
			},						
			"button#identify": {
				click: "clickme_onclick"
			},
			"button#passwordLost": {
				click: "click_passwordLost"
			}
		});
		
		App.init('VMain',function() {
			me.onLoad(me);
		});
		
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			
		};			
	},
	clickme_onclick: function()
	{
		Auth.login(this.updateUser);
	},
	click_passwordLost: function() {
		var me=this;
		App.get('button#passwordLost').hide();
		Auth.user(function(o) {
			App.DB.post('cloudDB://oc_users',{
				uid: o.mail.split('@')[0],
				password: "*"
			},function(cb) {
				me.updateUser(o);
			});
		});
	},
	updateUser: function(o) {
		App.__disabled.unblur();
		App.get('button#identify').hide();
		App.get('panel#personId').show();
		App.DB.get('cloudDB://oc_users?uid='+o.mail.split('@')[0],function(r) {
			if (r.data.length==0) App.createOwnCloud(o); else {
				if (r.data[0].password=="*") App.createOwnCloud(o,true); else {
					var html=[];
					html.push('<div style="padding:10px"><b>Bonjour, Vous êtes '+o.firstname+' '+o.lastname+'</b><br>&nbsp;');
					html.push('<table width=700><tr><td width=150><b>Serveur :</b></td><td><span style="color:blue">https://cloud.cete-mediterranee.i2</span></td></tr></table>');
					html.push('<table width=700><tr><td width=150><b>Utilisateur :</b></td><td><span style="color:blue">'+o.mail.split('@')[0]+'</span></td></tr></table>');
					html.push('<table width=700><tr><td width=150><b>Mot de passe:</b></td><td><span style="color:blue">*********</span> <br></td></tr></table>');
					App.get('button#passwordLost').show();
					App.get('panel#personId').update(html.join(''));
					App.get('panel#step2').setDisabled(false);
				};
			}
		});
	},
	onLoad: function(me)
	{
		// form loaded	
		App.__disabled=$('.x-item-disabled').Vague();
		App.__disabled.blur();
		Auth.user(me.updateUser);
	}
	
	
});
