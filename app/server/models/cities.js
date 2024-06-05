const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('City', {
    id: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'name'
    },
    stateId: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
        field: 'state_id'
    },
    stateCode: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'state_code'
    },
    countryId: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
        field: 'country_id'
    },
    countryCode: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        field: 'country_code'
    },
    latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
        field: 'latitude'
    },
    longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
        field: 'longitude'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '2014-01-01 06:31:01',
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        field: 'updatedAt'
    },
    flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'flag'
    },
    wikiDataId: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'wikiDataId',
        comment: 'Rapid API GeoDB Cities'
    }
}, {
    tableName: 'cities',
    timestamps: true,
});
