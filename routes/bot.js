const axios = require('axios');

var bot_works = {

    get_bot : function(){

        axios.get('https://api.telegram.org/bot469512967:AAH_pNKzN6bf4lp6zY631d0q5LlDVF8dN_U/getMe')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
};

module.exports = bot_works;