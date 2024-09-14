'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'date_of_birth');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.removeColumn('users', 'cpf');
    await queryInterface.removeColumn('users', 'mobile');
    await queryInterface.removeColumn('users', 'street');
    await queryInterface.removeColumn('users', 'number');
    await queryInterface.removeColumn('users', 'complement');
    await queryInterface.removeColumn('users', 'neighborhood');
    await queryInterface.removeColumn('users', 'city');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'date_of_birth', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn('users', 'mobile', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'street', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'number', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'complement', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'neighborhood', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
