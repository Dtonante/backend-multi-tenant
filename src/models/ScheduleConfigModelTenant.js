import { DataTypes } from "sequelize";

function DefineScheduleConfigModelTenant(sequelize, name_tenant) {
    const sanitizedTenantName = name_tenant.toLowerCase().replace(/\s+/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sequelize.define(`tbl_${sanitizedTenantName}_schedule_Configs`, {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        date: { type: DataTypes.DATEONLY, allowNull: true },
        workStart: { type: DataTypes.STRING, allowNull: false },
        workEnd: { type: DataTypes.STRING, allowNull: false, unique: true },
        lunchStart: { type: DataTypes.STRING, allowNull: false },
        lunchEnd: { type: DataTypes.STRING, allowNull: false }
    }, {
        timestamps: false,
    });
}

export default DefineScheduleConfigModelTenant
