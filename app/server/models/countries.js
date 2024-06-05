const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('counties', {
    id: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'name'
    },
    iso3: {
        type: Sequelize.CHAR(3),
        allowNull: true,
        defaultValue: null,
        field: 'iso3'
    },
    numericCode: {
        type: Sequelize.CHAR(3),
        allowNull: true,
        defaultValue: null,
        field: 'numeric_code'
    },
    iso2: {
        type: Sequelize.CHAR(2),
        allowNull: true,
        defaultValue: null,
        field: 'iso2'
    },
    phonecode: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'phonecode'
    },
    capital: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'capital'
    },
    currency: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'currency'
    },
    currencyName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'currency_name'
    },
    currencySymbol: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'currency_symbol'
    },
    tld: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'tld'
    },
    native: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'native'
    },
    region: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'region'
    },
    regionId: {
        type: Sequelize.MEDIUMINT,
        allowNull: true,
        defaultValue: null,
        field: 'region_id'
    },
    subregion: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'subregion'
    },
    subregionId: {
        type: Sequelize.MEDIUMINT,
        allowNull: true,
        defaultValue: null,
        field: 'subregion_id'
    },
    nationality: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        field: 'nationality'
    },
    timezones: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
        field: 'timezones'
    },
    translations: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
        field: 'translations'
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
    emoji: {
        type: Sequelize.STRING(191),
        allowNull: true,
        defaultValue: null,
        field: 'emoji'
    },
    emojiU: {
        type: Sequelize.STRING(191),
        allowNull: true,
        defaultValue: null,
        field: 'emojiU'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
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
    tableName: 'countries',
    timestamps: true
});
