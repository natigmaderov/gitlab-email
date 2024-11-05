const nodemailer = require('nodemailer');
const emailConfig = require('../config/mailconfig');
const emailLists = require('../utils/emailLists');
const createEmailTemplate = require('../utils/emailTemplate');

const transporter = nodemailer.createTransport({ ...emailConfig });

const sendEmail = (req, res) => {
    const { key } = req.params;
    const message = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const messageDetails = {
        name: message?.project?.name ?? "",
        namespace: message?.project?.namespace ?? "",
        pipelineId: message?.object_attributes?.id ?? "",
        branch: message?.object_attributes?.ref ?? "",
        status: message?.object_attributes?.status ?? "",
        detailedStatus: message?.object_attributes?.detailed_status ?? "",
        triggeredBy: message?.user?.name ?? "",
        web_url: message?.project?.web_url ?? "",
    };

    const recipientEmails = emailLists[key];

    if (!recipientEmails) {
        return res.status(404).json({ error: 'Email list not found for the provided key' });
    }

    const color = determineColor(messageDetails.status);
    const subject = `Pipeline #${messageDetails.pipelineId} Status for ${messageDetails.name} [${messageDetails.status}]`;
    const emailBody = createEmailTemplate(subject, messageDetails, color);

    const mailOptions = {
        from: 'gitlab-notify@example.com',
        to: recipientEmails.join(', '),
        subject: subject,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });
    });
};

const determineColor = (status) => {
    switch (status.toLowerCase()) {
        case 'failed':
            return '941715';
        case 'success':
        case 'passed':
            return '246b00';
        case 'canceled':
            return 'c15813';
        default:
            return '4285f4'; // Default color
    }
};

module.exports = { sendEmail };
