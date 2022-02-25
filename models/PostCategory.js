module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {}, 
  { tableName: 'PostsCategories', timestamps: false });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.Post, {
      foreignKey: 'categoryId', 
      through: 'PostsCategories', 
      as: 'posts',
    });

    models.Post.belongsToMany(models.Category, { 
      foreignKey: 'postId',
      through: 'PostsCategories',
      as: 'categories',
    });
  };

  return PostCategory;
};
