module.exports = (sequelize, DataTypes) => {

    const Issue = sequelize.define('Issue', {

        issue_id: {
            type: DataTypes.UUID,
            primaryKey:true,
            validate:{
                notEmpty:true
              }
        },

        issue_summary: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        identified_by: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        assigned_to: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        issue_priority: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        issue_status: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        issue_description:{
            type:DataTypes.TEXT,
            validate:{
                notEmpty:true
              }
        },

        project_id: {
            type: DataTypes.UUID,
            references:{
                model:'Projects',
                key:'project_id'
            },
            validate:{
                notEmpty:true
              }
        },
    }, {
    });

    return Issue;
}



