function parseDatabaseUrl(url) {
    const regex = /^mysql:\/\/(.*?):(.*?)@(.*?):(\d+)\/(.*?)$/;
    const match = url.match(regex);

    if (!match) throw new Error("DATABASE_URL inválida");

    const [, user, password, host, port, database] = match;

    return {
        user,
        password,
        host,
        port,
        database,
    };
}

export default parseDatabaseUrl;
