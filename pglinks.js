exports.createCustomer = function(sequelize,newUser){ 
sequelize.sync().then(function (err){
	var Customer = sequelize.import('./models/customer.js');
	var customer = Customer.build(newUser);
	customer.save().then(function () {
        console.log('Customer: '+ newUser);
    
    	});
	});
}