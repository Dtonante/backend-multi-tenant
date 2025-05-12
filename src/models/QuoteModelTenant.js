import { DataTypes } from "sequelize";

function DefineQuoteModelTenant(sequelize, name_tenant) {
    const sanitizedTenantName = name_tenant.toLowerCase().replace(/\s+/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sequelize.define(`tbl_${sanitizedTenantName}_quotes`, {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        dateAndTimeQuote: { type: DataTypes.DATE, allowNull: false },
        status: { 
            type: DataTypes.ENUM("activa", "realizada", "cancelada"),
            allowNull: false,
            defaultValue: "activa"
        }
    }, {
        timestamps: false,
    });
}

export default DefineQuoteModelTenant
