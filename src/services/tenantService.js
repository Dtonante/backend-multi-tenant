import bcrypt from "bcryptjs";
import DefineTenantAssociations from "../models/associations.js";
import DefineScheduleConfigModelTenant from "../models/ScheduleConfigModelTenant.js";

export const createDefaultRolesAndAdminUser = async (tenantSequelize, name_tenant, tenant_id) => {
  const { User, Role } = DefineTenantAssociations(tenantSequelize, name_tenant);
  const ScheduleConfig = DefineScheduleConfigModelTenant(tenantSequelize, name_tenant);

  try {
    // Crear roles por defecto solo si no existen
    const [adminRoleInstance] = await Role.findOrCreate({
      where: { name_role: "admin" },
    });

    const [clientRoleInstance] = await Role.findOrCreate({
      where: { name_role: "cliente" },
    });

    const adminRoleId = adminRoleInstance.id;

    // Crear usuario admin inicial si no existe
    const hashedAdminPassword = await bcrypt.hash("123", 10);
    await User.findOrCreate({
      where: { email: `admin@${name_tenant.toLowerCase()}.com` },
      defaults: {
        name_user: "admin",
        cellPhoneNumber: "123",
        email: `admin@${name_tenant.toLowerCase()}.com`,
        password: hashedAdminPassword,
        role_id: adminRoleId,
        tenant_id: tenant_id,
      },
    });

    // Crear configuración de horario por defecto
    await ScheduleConfig.findOrCreate({
      where: { date: null },
      defaults: {
        workStart: "09:00",
        workEnd: "20:00",
        lunchStart: "12:00",
        lunchEnd: "14:00"
      },
    });

    console.log("Roles y usuario admin creados correctamente.");
  } catch (error) {
    console.error("Error al crear roles y usuario admin:", error);
  }
};
