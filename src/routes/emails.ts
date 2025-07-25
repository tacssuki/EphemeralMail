import { Router } from 'express';
import { EmailController } from '@/controllers/EmailController';
import { emailValidation } from '@/middleware/validation';
import { validate } from '@/middleware/validation-middleware';
import { sessionMiddleware } from '@/middleware/session';

const router = Router();
const emailController = new EmailController();

/**
 * @swagger
 * /api/emails/generate:
 *   post:
 *     summary: Generate a new temporary email address
 *     tags: [Emails]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customPrefix:
 *                 type: string
 *                 description: Custom prefix for the email address (optional)
 *     responses:
 *       201:
 *         description: Email address generated successfully
 */
router.post('/generate', sessionMiddleware.requireSession, validate(emailValidation.generateEmail), emailController.generateEmail);

/**
 * @swagger
 * /api/emails/addresses:
 *   get:
 *     summary: Get list of generated email addresses
 *     tags: [Emails]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of addresses per page
 *     responses:
 *       200:
 *         description: List of generated email addresses
 */
router.get('/addresses', sessionMiddleware.requireSession, validate(emailValidation.getEmails, 'query'), emailController.getGeneratedAddresses);

/**
 * @swagger
 * /api/emails/{address}:
 *   get:
 *     summary: Get emails for a specific address
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address
 */
router.get('/:address', sessionMiddleware.requireSession, validate(emailValidation.emailAddress, 'params'), emailController.getEmails);

/**
 * @swagger
 * /api/emails/{address}/unread-count:
 *   get:
 *     summary: Get unread email count for an address
 *     tags: [Emails]
 */
router.get('/:address/unread-count', sessionMiddleware.requireSession, validate(emailValidation.emailAddress, 'params'), emailController.getUnreadCount);

/**
 * @swagger
 * /api/emails/{address}/info:
 *   get:
 *     summary: Get email address information
 *     tags: [Emails]
 */
router.get('/:address/info', sessionMiddleware.requireSession, validate(emailValidation.emailAddress, 'params'), emailController.getAddressInfo);

/**
 * @swagger
 * /api/emails/{address}/check:
 *   get:
 *     summary: Check if email address is available
 *     tags: [Emails]
 */
router.get('/:address/check', validate(emailValidation.emailAddress, 'params'), emailController.checkAvailability);

/**
 * @swagger
 * /api/emails/{address}:
 *   delete:
 *     summary: Delete all emails for an address
 *     tags: [Emails]
 */
router.delete('/:address', validate(emailValidation.emailAddress, 'params'), emailController.deleteAllEmails);

/**
 * @swagger
 * /api/emails/message/{id}:
 *   get:
 *     summary: Get a specific email by ID
 *     tags: [Emails]
 */
router.get('/message/:id', sessionMiddleware.requireSession, validate(emailValidation.emailId, 'params'), emailController.getEmailById);

/**
 * @swagger
 * /api/emails/message/{id}:
 *   delete:
 *     summary: Delete a specific email
 *     tags: [Emails]
 */
router.delete('/message/:id', validate(emailValidation.emailId, 'params'), emailController.deleteEmail);

/**
 * @swagger
 * /api/emails/manual:
 *   post:
 *     summary: Create a manual email address with custom prefix
 *     tags: [Emails]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prefix
 *             properties:
 *               prefix:
 *                 type: string
 *                 description: Custom prefix for the email address
 *     responses:
 *       201:
 *         description: Manual email address created successfully
 */
router.post('/manual', sessionMiddleware.requireSession, validate(emailValidation.manualEmail), emailController.createManualEmail);

export default router;
