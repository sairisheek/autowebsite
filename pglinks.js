exports.createCustomer = function(sequelize,newUser){ 
sequelize.sync().then(function (err){
	var Customer = sequelize.import('./models/customer.js');
	Customer.create(newUser).then(function () {
        console.log('Customer: '+ newUser);
    
    	});
	});
}