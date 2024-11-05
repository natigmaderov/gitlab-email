const createEmailTemplate = (subject, messageDetails, color) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Arial', sans-serif; color: #333; }
            .container { max-width: 500px; margin: auto; background: #fff; }
            .header { background-color: #${color}; color: #fff; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            table { width: 100%; margin-top: 20px; }
            th, td { padding: 15px; border: 3px solid #ddd; text-align: left; }
            strong { color: #${color}; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>${subject}</h2>
            </div>
            <div class="content">
                <table>
                    <tr><td><strong>Pipeline Id:</strong></td><td>${messageDetails.pipelineId}</td></tr>
                    <tr><td><strong>Project Name:</strong></td><td>${messageDetails.name}</td></tr>
                    <tr><td><strong>Namespace:</strong></td><td>${messageDetails.namespace}</td></tr>
                    <tr><td><strong>Status:</strong></td><td>${messageDetails.status}</td></tr>
                    <tr><td><strong>Branch:</strong></td><td>${messageDetails.branch}</td></tr>
                    <tr><td><strong>Detailed Status:</strong></td><td>${messageDetails.detailedStatus}</td></tr>
                    <tr><td><strong>Triggered By:</strong></td><td>${messageDetails.triggeredBy}</td></tr>
                    <tr><td><strong>GitLab URL:</strong></td><td><a href="${messageDetails.web_url}">Go to Repository</a></td></tr>
                </table>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = createEmailTemplate;
