Officer = {
	login : function(profile,auth_type,cb)
	{
		if (auth_type=="cas") {
			if (!profile.username) cb({});
			var mail=profile.username.toLowerCase();
			//bpclight://agents{kage,nom,prenom}?kage=(mela{kage}?libmela=$mail)
			Officer.using('db').store('bpclight','select kage,nom,prenom from agents where kage in (select kage from mela where libmela="'+mail+'")',function(err,result){
				if (!err) {
					var response={
						lastname: result.data[0].nom,
						firstname: result.data[0].prenom,
						uid: result.data[0].kage,
						mail: mail,
						profiles: Officer.getProfile(mail.split('@')[0])
					};
					cb(response);			
				} else cb(err);
			});
		};
		
	}
};

module.exports = Officer;