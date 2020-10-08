module.exports = (sequelize, DataTypes) => {

    const Project = sequelize.define('Project', {

        project_id: {
            type: DataTypes.UUID,
            primaryKey:true,
            validate:{
                notEmpty:true
              }
        },

        project_name: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        created_by: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:true
              }
        },

        expected_completion_time: {
            type: DataTypes.DATE,
            validate:{
                notEmpty:true
              }
        },

        description:{
            type:DataTypes.TEXT,
            validate:{
                notEmpty:true
              }
        }
    }, {
    });

    return Project;
}


