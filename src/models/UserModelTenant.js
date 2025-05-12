import { DataTypes } from "sequelize";

function DefineUserModelTenant(sequelize, name_tenant) {
    const sanitizedTenantName = name_tenant.toLowerCase().replace(/\s+/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sequelize.define(`tbl_${sanitizedTenantName}_users`, {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        tenant_id: { type: DataTypes.INTEGER, allowNull: false },
        name_user: { type: DataTypes.STRING, allowNull: false },
        cellPhoneNumber: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: false }

    }, {
        timestamps: false,
    });
}

export default DefineUserModelTenant
