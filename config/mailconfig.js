const emailConfig = {
    host: 'mail.example.net',
    port: 465,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'gitlab-notify@example.local',
        pass: 'password',
    },
    tls: {
        rejectUnauthorized: false
    }
};

module.exports = emailConfig;
