const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('State', {
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
    fipsCode: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'fips_code'
    },
    iso2: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'iso2'
    },
    type: {
        type: Sequelize.STRING(191),
        allowNull: true,
        defaultValue: null,
        field: 'type'
    },
    latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true,
        defaultValue: null,
        field: 'latitude'
    },
    longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true,
        defaultValue: null,
        field: 'longitude'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    tableName: 'states',
    timestamps: true,
});
