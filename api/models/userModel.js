const databaseConnection = require('../util/databaseConnection');
const encryptor = require('../middleware/encryptor');


exports.fetchAllUsers = async () => {
    return databaseConnection.query('SELECT * FROM peUsers');
};

exports.fetchUser = async (username) => {
    return databaseConnection.query('SELECT * FROM peUsers WHERE username = ?', [username]);
};

exports.fetchUserById = async (userId) => {
    return databaseConnection.query('SELECT * FROM peUsers WHERE idUser = ?', [userId]);
};

exports.fetchUserRole = async (userId) => {
    return databaseConnection.query('SELECT privilegeId as role FROM peUsers JOIN peUsersPrivileges ON peUsers.idUser = peUsersPrivileges.userId WHERE peUsers.idUser = ?', [userId]);
}

exports.deleteUser = async (userId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('DELETE FROM peUsers WHERE idUser = ?', [userId], async (err) => {
            if (err) reject(err);
        })
        resolve(query);
    });
}

exports.updateUser = async (user) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('UPDATE peUsers SET nickname = ?, age = ?, username = ?, email = ? WHERE idUser = ?',
            [user.nickname, user.age, user.username, user.email, user.userId], async (err) => {
                if (err) reject(err);
            })
        resolve(query);
    });
}

exports.checkCredentials = async (username, email) => {
    return new Promise((resolve, reject) => {
        const exists = databaseConnection.query('SELECT * FROM peUsers WHERE username = ? OR email = ?', [username, email], async (err, res) => {
            if (err) reject(err);
            if (res === undefined) reject("Error")
        });
        resolve(exists);
    });
};


exports.createUser = async (user) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO peUsers (username, email, password, accDate, nickname, age) VALUES (?,?,?,?,?,?)', [user.username, user.email, user.password, new Date(), user.nickname, user.age], async (err) => {
            if (err) reject(err);
        })
        resolve(query);
    });
};

exports.createPrivilege = async (userId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO peUsersPrivileges (userId, privilegeId) VALUES (?,1)', [userId], async (err) => {
            if (err) reject(err);
        })
        resolve(query);
    });
}

exports.encryptUser = async (user) => {
    const encryptedUser = user;
    encryptedUser.password = encryptor.encrypt(user.password);
    return Promise.resolve(encryptedUser);
}

exports.comparePasswords = async (givenPassword, databasePassword) => {
    if (encryptor.encrypt(givenPassword) == databasePassword) return Promise.resolve(true);
    else return Promise.resolve(false);
}


/*
exports.checkIfTokenExists = async (refreshToken) => {
    return databaseConnection.query('SELECT * FROM peUsers WHERE refreshToken = ?', [refreshToken]);
}*/

/*
exports.storeRefreshToken = async (refreshToken, username) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('UPDATE peUsers SET refreshToken = ? WHERE username = ?', [refreshToken, username], async (err) => {
            if (err) reject(err);
        })
        resolve(query);
    });
}
*/