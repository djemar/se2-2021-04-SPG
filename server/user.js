class User {
    constructor(name,surname,email,hash){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.hash = hash;
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