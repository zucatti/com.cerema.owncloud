App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
			]		
		},
		{
			region: "center",			
			split:true,
			layout: "vbox",
			autoScroll: true,
			items: [
				{
					layout: "hbox",
					width: "100%",
					border: false,
					items: [
					{
						html: "<big>L’application <b>CeremaCloud</b> offre un espace synchronisé permettant de partager des documents à l’intérieur tout autant qu'à l’extérieur du Cerema.<br>Il facilite ainsi le travail collaboratif et permet d’accéder aux données depuis différents supports :<li>Le poste de travail professionnel<li>Ordinateur perso<li>Téléphone portable</big>",
						flex: 1,
						padding: 10,
						border: false
					},
					{
						bodyCls: "cerema",
						padding: 10,
						border: false,
						width: 472,
						height: 250					
					}
					]
				},
				{
					layout: "vbox",
					border: false,
					width: "100%",
					padding: 10,
					items: [
						{
							html: "<div class=step>1. Identification</div><hr noshade><br>",
							width: "100%",
							border: false
						},
						{
							title: "Vos informations de connexion",
							html: "",
							hidden: true,
							itemId: "personId",
							border: true,
							bbar: [
								'->',
								{
									text: "J'ai perdu mon mot de passe",
									itemId: "passwordLost",
									hidden: true
								}
							]
						},
						{
							xtype: "button",
							itemId: "identify",
							text: "Identification",
							height: 20,
							border: false
						}
					]
				},
				{
					layout: "vbox",
					itemId: "step2",
					border: false,
					disabled: true,
					width: "100%",
					padding: 10,
					items: [
						{
							html: "<div class=step>2. Télécharger l'application</div><hr noshade><br>",
							width: "100%",
							border: false
						},
						{
							html: "<big><big><b>Sur votre ordinateur</b></big></big>",
							width: "100%",
							margin: {
								bottom: 15
							},
							border: false						
						},
						{
							layout: "hbox",
							width: "100%",
							border: false,
							margin: {
								bottom: 15
							},
							items: [
								{
									bodyCls: "winstore",
									itemId: "pkg_win",
									width:200,
									height:128,
									border: false,
									listeners: {
										click: {
											element: 'el',
											fn: function(){
												var panel = Ext.getCmp(this.id);
												panel.fireEvent('click');
											}
										}
									}									
								},
								{
									bodyCls: "appstore",
									itemId: "pkg_osx",
									width:200,
									height:128,
									border: false,
									listeners: {
										click: {
											element: 'el',
											fn: function(){
												var panel = Ext.getCmp(this.id);
												panel.fireEvent('click');
											}
										}
									}
								},
								{
									bodyCls: "linuxstore",
									itemId: "pkg_x",
									width:200,
									height:128,
									border: false,
									listeners: {
										click: {
											element: 'el',
											fn: function(){
												var panel = Ext.getCmp(this.id);
												panel.fireEvent('click');
											}
										}
									}
								}
							]
						},
						{
							html: "<b><big><big>Sur votre tablette/smartphone</b></big></big>",					
							width: "100%",
							margin: {
								top: 15
							},
							border: false						
						},
						{
							layout: "hbox",
							width: "100%",
							border: false,
							items: [
								{
									bodyCls: "sappstore",
									itemId: "pkg_ios",
									width:220,
									height:192,
									border: false,
									listeners: {
										click: {
											element: 'el',
											fn: function(){
												var panel = Ext.getCmp(this.id);
												panel.fireEvent('click');
											}
										}
									}
								},
								{
									bodyCls: "splaystore",
									itemId: "pkg_android",
									margin: {
										left: 20
									},
									width:220,
									height:192,
									border: false,
									listeners: {
										click: {
											element: 'el',
											fn: function(){
												var panel = Ext.getCmp(this.id);
												panel.fireEvent('click');
											}
										}
									}
								}
							]
						}
					]
				}				
			]
		}
	]
	
});
