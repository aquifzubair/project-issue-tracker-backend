module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment', {

        comment_id: {
            type: DataTypes.UUID,
            primaryKey:true,
            validate:{
                notEmpty:true
              }
        },

        comment_message: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        comment__by: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        issue_id: {
            type: DataTypes.UUID,
            references:{
                model:'Issues',
                key:'issue_id'
            },
            validate:{
                notEmpty:true
              }
        },
    }, {
    });

    return Comment;
}



