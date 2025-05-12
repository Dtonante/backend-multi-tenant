import { DataTypes } from "sequelize";

function DefineRoleModelTenant(sequelize, name_tenant) {
    const sanitizedTenantName = name_tenant.toLowerCase().replace(/\s+/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sequelize.define(`tbl_${sanitizedTenantName}_roles`, {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name_role: { type: DataTypes.STRING, allowNull: false },
    }, {
        timestamps: false,
    });
}

export default DefineRoleModelTenant
