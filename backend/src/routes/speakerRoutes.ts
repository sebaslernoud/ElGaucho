import { Router } from 'express';
import {
    createSpeaker,
    deleteSpeaker,
    getAllSpeakers,
    getSpeakerById,
    updateSpeaker,
} from '../controllers/speakerController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllSpeakers);
router.get('/:id', getSpeakerById);
router.post('/', authenticateToken, authorizeRoles(['admin']), createSpeaker);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), updateSpeaker);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteSpeaker);

export default router;
