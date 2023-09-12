const Sequelize = require('sequelize');

// module.exports = (Sequelize) => {
//     const Board = Sequelize.define('Board',
module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
        {   // 테이블 컬럼에 대한 설정
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            writerId : {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            category : {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            insertDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW(),
            }
        },
        {   // 테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'  // 한글 사용 허용
        })
    }
    static associate(db) {
        // db.Board.belongsTo(db.Board, { foreignKey: '', targetKey: ''})
    }
}