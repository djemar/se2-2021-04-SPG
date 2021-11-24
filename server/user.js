class User {
    constructor(user_input){
        this.name = user_input.name;
        this.surname = user_input.surname;
        this.email = user_input.email;
        this.hash = user_input.hash;
        this.Type = user_input.Type;
        this.address = user_input.address;
        this.phone = user_input.phone;
        this.country = user_input.country;
        this.city = user_input.city;
        this.zip_code = user_input.zip_code;
    }

    /**
     * Construct a User from a plain object
     * @param {{}} json
     * @return {User} the newly created User object
     */
    static from(json) {
        return Object.assign(new User(), json);
    }
}

module.exports = User