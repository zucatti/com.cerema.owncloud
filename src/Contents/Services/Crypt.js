Crypt= {
	createKey: function(cb) {
		cb(Crypt.using('shortid').generate());
	},
	encrypt: function(o,cb) {
		var request=Crypt.using('request');
		request({
			uri: "https://cloud.cete-mediterranee.i2/key.php",
			strictSSL: false,
			method: "post",
			formData: {
				key: o
			}
		},function(err,httpResponse,body) {
			console.log(err);
			cb(body);
		});		
	}
};

module.exports=Crypt;